<template>
  <div :class="$style.heroSection">
    <img src="/logo/cat.jpeg" :class="$style.heroImage" alt="Hero" />
  </div>
</template>

<style module>
.heroSection {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  box-sizing: border-box;
}

.heroImage {
  width: 100%;
  max-width: 1200px;
  height: auto;
  border-radius: 12px;
  object-fit: cover;
  transition: all 0.3s ease;
}

/* Tablet view */
@media (max-width: 1024px) {
  .heroImage {
    max-width: 900px;
    border-radius: 10px;
  }
}

/* Mobile view */
@media (max-width: 768px) {
  .heroSection {
    padding: 12px;
  }

  .heroImage {
    max-width: 100%;
    border-radius: 8px;
  }
}

/* Very small mobile view */
@media (max-width: 480px) {
  .heroImage {
    border-radius: 6px;
  }
}
</style>
