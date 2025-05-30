<script setup>
import $api from '~~/src/composables/useRequest'
import { ref, onMounted } from 'vue'
import { useAuthStore } from '~~/src/stores/auth'
import moment from 'moment'

const props = defineProps({
  contentId: {
    type: Number,
    required: true
  },
  courseId: {
    type: Number,
    required: true
  },
  sectionId: {
    type: Number,
    required: true
  }
})

const { user } = useAuthStore();
const comments = ref([])
const newComment = ref('')
const loading = ref(false)
const error = ref(null)
const replyingTo = ref(null)
const replyInputs = ref({})
const editingComment = ref(null) // Track which comment is being edited
const editInputs = ref({}) // Store edit text for each comment

const fetchComments = async () => {
  try {
    loading.value = true
    error.value = null
    const { data, error: fetchError } = await $api.get(`live-comments?content_id=${props.contentId}`)
    
    if (fetchError?.value) {
      error.value = fetchError.value
    } else {
      // Sort comments by newest first (both parent and child comments)
      comments.value = (data.value?.data || []).map(comment => ({
        ...comment,
        replies: comment.replies?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) || []
      })).sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    }
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
}

const postComment = async () => {
  if (!newComment.value.trim()) return
  
  const payload = {
    comment: newComment.value,
    content_id: props.contentId,
    course_id: props.courseId,
    section_id: props.sectionId,
    parent_id: null
  }

  try {
    const { data, error: postError } = await $api.post('/live-comments', payload)
    if (data?.value) {
      newComment.value = ''
      await fetchComments()
    } else {
      throw postError.value
    }
  } catch (err) {
    console.error(err)
  }
}

const postReply = async (parentId) => {
  const reply = replyInputs.value[parentId]
  if (!reply || !reply.trim()) return

  const payload = {
    comment: reply,
    content_id: props.contentId,
    course_id: props.courseId,
    section_id: props.sectionId,
    parent_id: parentId
  }

  try {
    const { data, error: replyError } = await $api.post('/live-comments', payload)
    if (data?.value) {
      replyInputs.value[parentId] = ''
      replyingTo.value = null
      await fetchComments()
    } else {
      throw replyError.value
    }
  } catch (err) {
    console.error(err)
  }
}

const startEditing = (comment) => {
  editingComment.value = comment.id
  editInputs.value[comment.id] = comment.comment
}

const cancelEditing = () => {
  editingComment.value = null
}

const updateComment = async (commentId) => {
  // return console.log(commentId)
  const updatedText = editInputs.value[commentId]
  return console.log(updatedText)
  if (!updatedText || !updatedText.trim()) return

  try {
    const { data, error: updateError } = await $api.put(`/live-comments/${commentId}`, {
      comment: updatedText
    })
    
    if (data?.value) {
      editingComment.value = null
      await fetchComments()
    } else {
      throw updateError.value
    }
  } catch (err) {
    console.error(err)
  }
}

const deleteComment = async (commentId) => {
  try {
    const { data, error: deleteError } = await $api.delete(`/live-comments/${commentId}`)
    if (data?.value) {
      await fetchComments()
    } else {
      throw deleteError.value
    }
  } catch (err) {
    console.error(err)
  }
}

const isCommentAuthor = (comment) => {
  return user && comment.user && user.id === comment.user.id
}

onMounted(fetchComments)
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
    <!-- Header with refresh button -->
    <div class="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50">
      <h2 class="text-lg font-semibold text-gray-800">Discussion</h2>
      <button 
        @click="fetchComments"
        class="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
        :disabled="loading"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          class="h-4 w-4 mr-1" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          :class="{ 'animate-spin': loading }"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Refresh
      </button>
    </div>

    <!-- New comment form at the top -->
    <div class="p-4 border-b border-gray-100">
      <textarea
        v-model="newComment"
        placeholder="Share your thoughts..."
        class="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        rows="3"
      ></textarea>
      <div class="flex justify-end mt-2">
        <button
          @click="postComment"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-slate-500 transition"
          :disabled="!newComment.trim() || loading"
        >
          Comment
        </button>
      </div>
    </div>

    <!-- Comments section -->
    <div class="p-4">
      <div v-if="loading && !comments.length" class="flex justify-center py-8">
        <div class="animate-pulse text-gray-500">Loading comments...</div>
      </div>
      
      <div v-else-if="error" class="text-center py-8 text-red-500">
        Failed to load comments. <button @click="fetchComments" class="text-blue-600 hover:underline">Try again</button>
      </div>
      
      <div v-else-if="!comments.length" class="text-center py-8 text-gray-500">
        No comments yet. Be the first to share your thoughts!
      </div>
      
      <div v-else class="space-y-6">
        <div v-for="comment in comments" :key="comment.id" class="group">
          <!-- Parent comment -->
          <div class="flex space-x-3">
            <div class="flex-shrink-0">
              <div class="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                {{ comment.user?.name?.charAt(0)?.toUpperCase() || 'A' }}
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <div class="bg-gray-50 p-3 rounded-lg">
                <div class="flex items-center space-x-2">
                  <p class="text-sm font-medium text-gray-900">{{ comment.user?.name || 'Anonymous' }}</p>
                  <!-- <span class="text-xs text-gray-500">{{ new Date(comment.created_at).toLocaleString() }}</span> -->
                   <span class="text-xs text-gray-500"> {{ moment(comment.created_at).format('YYYY-MM-DD HH:mm') }}</span>
                </div>
                
                <!-- Edit mode -->
                <div v-if="editingComment === comment.id" class="mt-2">
                  <textarea
                    v-model="editInputs[comment.id]"
                    class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    rows="3"
                  ></textarea>
                  <div class="flex justify-end space-x-2 mt-2">
                    <button
                      @click="cancelEditing"
                      class="px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      @click="updateComment(comment.id)"
                      class="px-3 py-1 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
                      :disabled="!editInputs[comment.id]?.trim()"
                    >
                      Update
                    </button>
                  </div>
                </div>
                
                <!-- View mode -->
                <template v-else>
                  <p class="mt-1 text-sm text-gray-700">{{ comment.comment }}</p>
                  <div class="mt-2 flex space-x-3">
                    <button
                      @click="replyingTo === comment.id ? replyingTo = null : replyingTo = comment.id"
                      class="text-xs text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {{ replyingTo === comment.id ? 'Cancel' : 'Reply' }}
                    </button>
                    <button
                      v-if="isCommentAuthor(comment)"
                      @click="startEditing(comment)"
                      class="text-xs text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      v-if="isCommentAuthor(comment)"
                      @click="deleteComment(comment.id)"
                      class="text-xs text-red-600 hover:text-red-800 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </template>
              </div>

              <!-- Reply input -->
              <div v-if="replyingTo === comment.id" class="mt-3 pl-4">
                <textarea
                  v-model="replyInputs[comment.id]"
                  placeholder="Write your reply..."
                  class="w-full p-3 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  rows="2"
                ></textarea>
                <div class="flex justify-end mt-2 space-x-2">
                  <button
                    @click="replyingTo = null"
                    class="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    @click="postReply(comment.id)"
                    class="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:bg-slate-500 transition"
                    :disabled="!replyInputs[comment.id]?.trim()"
                  >
                    Reply
                  </button>
                </div>
              </div>

              <!-- Replies -->
              <div v-if="comment.replies?.length" class="mt-3 space-y-3 pl-4 border-l-2 border-gray-100">
                <div v-for="reply in comment.replies" :key="reply.id" class="flex space-x-3">
                  <div class="flex-shrink-0">
                    <div class="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-medium">
                      <div v-if="reply.user?.image?.link">
                        <img :src="reply.user?.image?.link" alt="">
                      </div>
                      <div v-else>
                        {{ reply.user?.name?.charAt(0)?.toUpperCase() || 'A' }}
                      </div>
                    </div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="bg-gray-50 p-2 rounded-lg">
                      <div class="flex items-center space-x-2">
                        <p class="text-xs font-medium text-gray-900">{{ reply.user?.name || 'Anonymous' }}</p>
                        <span class="text-xs text-gray-500">{{ new Date(reply.created_at).toLocaleString() }}</span>
                      </div>
                      
                      <!-- Edit mode for reply -->
                      <div v-if="editingComment === reply.id" class="mt-1">
                        <textarea
                          v-model="editInputs[reply.id]"
                          class="w-full p-1 text-xs border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          rows="2"
                        ></textarea>
                        <div class="flex justify-end space-x-1 mt-1">
                          <button
                            @click="cancelEditing"
                            class="px-2 py-0.5 text-xs text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                          >
                            Cancel
                          </button>
                          <button
                            @click="updateComment(reply.id)"
                            class="px-2 py-0.5 text-xs text-white bg-blue-600 rounded-md hover:bg-blue-700"
                            :disabled="!editInputs[reply.id]?.trim()"
                          >
                            Update
                          </button>
                        </div>
                      </div>
                      
                      <!-- View mode for reply -->
                      <template v-else>
                        <p class="mt-1 text-xs text-gray-700">{{ reply.comment }}</p>
                        <div class="flex space-x-2 mt-1">
                          <button
                            v-if="isCommentAuthor(reply)"
                            @click="startEditing(reply)"
                            class="text-xs text-gray-600 hover:text-gray-800 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            v-if="isCommentAuthor(reply)"
                            @click="deleteComment(reply.id)"
                            class="text-xs text-red-600 hover:text-red-800 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
textarea {
  resize: none;
}

/* Smooth transitions for interactive elements */
button, textarea, input {
  transition: all 0.2s ease;
}

/* Better focus states */
button:focus, textarea:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}
</style>