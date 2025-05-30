<template>
  <div class="course-content-accordion">
    <div v-for="(item, index) in items" :key="index" class="accordion-item">
      <!-- Parent Accordion -->
      <div
        @click="openSutter(index)"
        class="parent-accordion-header"
        :class="{ 'is-active': targetClick === index }"
      >
        <h3 class="parent-title">
          {{ item.title }}
        </h3>
        <Icon
          :name="targetClick === index ? 'ion:ios-arrow-up' : 'material-symbols:arrow-forward-ios-rounded'"
          class="accordion-arrow"
        />
      </div>

      <!-- Parent Content -->
      <div v-if="isOpen && targetClick === index" class="accordion-content">
        <!-- Child Sections -->
        <div v-if="item?.sub_sections?.length" class="child-sections">
          <div v-for="(child, childIndex) in item.sub_sections" :key="childIndex" class="child-item">
            <!-- Child Accordion -->
            <div
              @click="openSutterChild(childIndex)"
              class="child-accordion-header"
              :class="{ 'is-active': targetClickChild === childIndex }"
            >
              <h4 class="child-title">
                <Icon name="ion:book-sharp" class="child-icon" />
                {{ child.title }}
              </h4>
              <Icon
                :name="targetClickChild === childIndex ? 'ion:ios-arrow-up' : 'material-symbols:arrow-forward-ios-rounded'"
                class="accordion-arrow"
              />
            </div>

            <!-- Child Content -->
            <div v-if="isOpenChild && targetClickChild === childIndex" class="child-content">
              <p v-if="child.body" class="child-description">{{ child.body }}</p>
              <div v-else>
                <div v-if="child.contents?.length" class="content-items">
                  <nuxt-link
                    v-for="(content, contentIndex) in child.contents"
                    :key="contentIndex"
                    :to="`/my-courses/${slug}/${content.slug}`"
                    class="content-link"
                  >
                    <div class="content-info">
                      <img
                        :src="getIcon(content.type)"
                        :alt="content.type + ' icon'"
                        class="content-icon"
                      />
                      <span class="content-title">{{ content.title }}</span>
                    </div>
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Parent Contents -->
        <div v-if="item.contents?.length" class="content-items">
          <nuxt-link
            v-for="(content, contentIndex) in item.contents"
            :key="contentIndex"
            :to="`/my-courses/${slug}/${content.slug}`"
            class="content-link parent-content-link"
          >
            <div class="content-info">
              <img
                :src="getIcon(content.type)"
                :alt="content.type + ' icon'"
                class="content-icon"
              />
              <span class="content-title">{{ content.title }}</span>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
    default: [],
  },
  slug: {
    type: String,
    default: "",
  },
});


// console.log('Selected Content',props.items)

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
.router-link-exact-active {
  background-color: #f1b963 !important;
  background-image: none !important;
  font-weight: 700;
  color:white  !important ;
}

.course-content-accordion {
  font-family: 'Inter', sans-serif;
  max-width: 100%;
  margin: 0 auto;
}

.accordion-item {
  border-radius: 12px;
  margin-bottom: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}

.parent-accordion-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 24px;
  background-color: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid #f0f0f0;
  
  &.is-active {
    background-color: #f8fafc;
    border-bottom-color: transparent;
  }
  
  &:hover {
    background-color: #f8fafc;
  }
}

.parent-title {
  font-size: 18px;
  font-weight: 600;
  color: #2b2b2b;
  margin: 0;
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

.child-accordion-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 20px;
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
  color: #2b2b2b;
  margin: 0;
  display: flex;
  align-items: center;
}

.child-icon {
  margin-right: 12px;
  color: #ff4757;
}

.accordion-arrow {
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

.content-link {
  display: block;
  padding: 12px 16px;
  background-color: #f2f7fb;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #e1f0ff;
    transform: translateY(-1px);
  }
  
  &.parent-content-link {
    background-color: #ffffff;
    border: 1px solid #e2e8f0;
    
    &:hover {
      background-color: #f8fafc;
    }
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
  color: #2b2b2b;
}

@media (max-width: 768px) {
  .parent-accordion-header {
    padding: 14px 16px;
  }
  
  .parent-title {
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