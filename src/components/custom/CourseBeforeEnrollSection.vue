<template>
  <div class="course-accordion">
    <div v-for="(item, index) in items" :key="index" class="accordion-item">
      <div
        class="accordion-header"
        :class="{ 'is-active': targetClick === index }"
        @click="openSutter(index)"
      >
        <h3 class="accordion-title">{{ item.title }}</h3>
        <div class="accordion-icon">
          <Icon :name="targetClick === index ? 'ion:ios-arrow-up' : 'material-symbols:arrow-forward-ios-rounded'" />
        </div>
      </div>
      
      <div v-if="isOpen && targetClick === index" class="accordion-content">
        <!-- Child sections -->
        <div v-if="item?.sub_sections?.length" class="child-sections">
          <div v-for="(child, childIndex) in item.sub_sections" :key="childIndex" class="child-item">
            <div
              class="child-header"
              :class="{ 'is-active': targetClickChild === childIndex }"
              @click="openSutterChild(childIndex)"
            >
              <h4 class="child-title">
                <Icon name="material-symbols-light:folder-copy-rounded" class="child-icon" />
                {{ child.title }}
              </h4>
              <Icon
                :name="targetClickChild === childIndex ? 'ion:ios-arrow-up' : 'material-symbols:arrow-forward-ios-rounded'"
                class="child-arrow"
              />
            </div>
            
            <div v-if="isOpenChild && targetClickChild === childIndex" class="child-content">
              <p v-if="child.body" class="child-description">{{ child.body }}</p>
              <div v-else>
                <div v-if="child.contents?.length" class="content-items">
                  <button
                    v-for="(content, contentIndex) in child.contents"
                    :key="contentIndex"
                    :disabled="content.paid"
                    @click="openModal(content.slug)"
                    class="content-button"
                    :class="{ 'is-locked': content.paid }"
                  >
                    <div class="content-info">
                      <img
                        :src="getIcon(content.type)"
                        :alt="content.type + ' icon'"
                        class="content-icon"
                      />
                      <span class="content-title">{{ content.title }}</span>
                    </div>
                    <img
                      :src="content.paid ? '/images/icon/LockLock.png' : '/images/icon/unlock.png'"
                      alt="Lock status"
                      class="lock-icon"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Parent contents -->
        <div v-if="item.contents?.length" class="content-items">
          <button
            v-for="(content, contentIndex) in item.contents"
            :key="contentIndex"
            :disabled="content.paid"
            @click="openModal(content.slug)"
            class="content-button"
            :class="{ 'is-locked': content.paid }"
          >
            <div class="content-info">
              <img
                :src="getIcon(content.type)"
                :alt="content.type + ' icon'"
                class="content-icon"
              />
              <span class="content-title">{{ content.title }}</span>
            </div>
            <img
              :src="content.paid ? '/images/icon/LockLock.png' : '/images/icon/unlock.png'"
              alt="Lock status"
              class="lock-icon"
            />
          </button>
        </div>
      </div>
    </div>
    
    <CommonModal
      @closeModal="closeModal($event)"
      :modalOpen="modalOpen"
      :courseContent="courseContent"
    />
  </div>
</template>

<script setup>
import $api from "~~/src/composables/useRequest";

const modalOpen = ref(false);
const courseContent = ref({});
const props = defineProps({
  items: {
    type: Array,
    default: [],
  },
});

const openModal = async (slug) => {
  const { data, pending, error, refresh } = await $api.get(`/content/${slug}`);
  if (error && error._value) {
    console.log(error);
  } else {
    courseContent.value = data.value.data;
  }
  modalOpen.value = true;
};

const closeModal = (evn) => {
  modalOpen.value = evn;
};

// Parent accordion
const isOpen = ref(false);
const targetClick = ref(-1);
const openSutter = (i) => {
  if (i === targetClick.value) {
    targetClick.value = -1;
    isOpen.value = !isOpen.value;
  } else {
    targetClick.value = i;
    isOpen.value = true;
  }
};

// Child accordion
const isOpenChild = ref(false);
const targetClickChild = ref(-1);
const openSutterChild = (i) => {
  if (i === targetClickChild.value) {
    targetClickChild.value = -1;
    isOpenChild.value = !isOpenChild.value;
  } else {
    targetClickChild.value = i;
    isOpenChild.value = true;
  }
};

const getIcon = (type) => {
  const icons = {
    video: "/images/icon/class.png",
    pdf: "/images/icon/pdf2.png",
    note: "/images/icon/note2.png",
    exam: "/images/icon/exam2.png",
    link: "/images/icon/link2.png",
    live: "/images/icon/live2.png"
  };
  return icons[type] || "/images/icon/Note.png";
};
</script>

<style lang="scss" scoped>
.course-accordion {
  font-family: 'Inter', sans-serif;
  max-width: 100%;
  margin: 0 auto;
}

.accordion-item {
  border-radius: 12px;
  margin-bottom: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}

.accordion-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &.is-active {
    background-color: #f8fafc;
  }
  
  &:hover {
    background-color: #f8fafc;
  }
}

.accordion-title {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.accordion-icon {
  color: #17107F;
  transition: transform 0.2s ease;
  
  .is-active & {
    transform: rotate(180deg);
  }
}

.accordion-content {
  padding: 0 16px 16px;
  background-color: #ffffff;
}

.child-sections {
  margin-top: 8px;
}

.child-item {
  border-radius: 8px;
  margin-bottom: 8px;
  overflow: hidden;
  background-color: #f8fafc;
}

.child-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &.is-active {
    background-color: #e9f6ff;
  }
  
  &:hover {
    background-color: #f1f9ff;
  }
}

.child-title {
  font-size: 16px;
  font-weight: 500;
  color: #0072BB;
  margin: 0;
  display: flex;
  align-items: center;
}

.child-icon {
  margin-right: 12px;
  color: #0072BB;
}

.child-arrow {
  color: #0072BB;
}

.child-content {
  padding: 8px 16px 16px;
}

.child-description {
  font-size: 14px;
  color: #64748b;
  line-height: 1.5;
}

.content-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.content-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: #f2f7fb;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  width: 100%;
  
  &:hover:not(:disabled) {
    background-color: #e1f0ff;
    transform: translateY(-1px);
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
  
  &.is-locked {
    background-color: #f5f5f5;
  }
}

.content-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.content-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.content-title {
  font-size: 15px;
  color: #555555;
  
  .is-locked & {
    color: #94a3b8;
  }
}

.lock-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

@media (max-width: 768px) {
  .accordion-header {
    padding: 14px 16px;
  }
  
  .accordion-title {
    font-size: 16px;
  }
  
  .child-title {
    font-size: 15px;
  }
  
  .content-title {
    font-size: 14px;
  }
}
</style>