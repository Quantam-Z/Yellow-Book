import { defineStore } from 'pinia';

export const useContentStore = defineStore('content', {
  state: () => ({
    course_id: null,
    section_id: null,
    content_id: null,
    section: null,
    liveComments: [],
  }),

  actions: {
    setContentIds({ course_id, section_id, content_id }) {
      this.course_id = course_id;
      this.section_id = section_id;
      this.content_id = content_id;
    },

    setSection(data) {
      this.section = data;
    },

    setLiveComments(comments) {
      this.liveComments = comments;
    },

    clearContent() {
      this.course_id = null;
      this.section_id = null;
      this.content_id = null;
      this.section = null;
      this.liveComments = [];
    }
  },

  persist: true  // Optional: persist state across page reloads
});
