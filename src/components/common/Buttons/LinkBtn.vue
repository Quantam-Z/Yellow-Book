<template>
  <div>
    <nuxt-link 
      class="neon-button"
      :class="styles"
      :to="link"
      :style="{
        '--base-color': '#17107F',
        '--hover-color': '#2a1fbf'
      }"
    >
      {{ text }}
    </nuxt-link>
  </div>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    default: 'All courses'
  },
  link: {
    type: String,
    default: ''
  },
  styles: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" scoped>
.neon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.75rem;
  // border-radius: 9999px;
  background-color: var(--base-color);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 
              0 2px 4px -1px rgba(0, 0, 0, 0.06);
  
  @media (min-width: 768px) {
    font-size: 1rem;
    padding: 0.875rem 2rem;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
                rgba(255, 255, 255, 0.1) 0%, 
                rgba(255, 255, 255, 0.3) 50%, 
                rgba(255, 255, 255, 0.1) 100%);
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }

  &:hover {
    background-color: var(--hover-color);
    transform: translateY(-1px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 
                0 4px 6px -2px rgba(0, 0, 0, 0.05);

    &::before {
      transform: translateX(100%);
    }
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1), 
                0 1px 2px -1px rgba(0, 0, 0, 0.05);
  }
}
</style>