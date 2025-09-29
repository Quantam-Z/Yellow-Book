<script setup>
import { Star } from "lucide-vue-next";
</script>

<template>
  <div :class="$style.groupParent">
    <div :class="$style.frameParent">
      <img :class="$style.groupChild" src="/logo/image6.png" alt="Main background" />
      <img :class="$style.groupItem" src="/logo/image7.png" alt="Overlay logo" />
    </div>
    <div :class="$style.frameGroup">
      <div :class="$style.revolutionizingTechnologyParent">
        <div :class="$style.revolutionizingTechnology">Revolutionizing Technology</div>
        <div :class="$style.innovativeTechnologySolution">
          Innovative technology solutions for modern businesses
        </div>
      </div>
      <div :class="$style.frameContainer">
        <div :class="$style.frameDiv">
          <!-- ⭐ Lucide Icons -->
          <Star :class="$style.starIcon" />
          <Star :class="$style.starIcon" />
          <Star :class="$style.starIcon" />
          <Star :class="$style.starIcon" />
          <Star :class="$style.starIcon" />
        </div>
        <b :class="$style.b">4.8</b>
        <div :class="$style.reviews">(458 reviews)</div>
      </div>
    </div>
  </div>
</template>

<style module>
.groupParent {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  text-align: center;
  font-size: 46px;
  color: #000;
  font-family: 'Plus Jakarta Sans';
}

/* Frame takes image size */
.frameParent {
  position: relative;
  width: 100%;
  max-width: 1200px;
}

/* Background image sets parent height automatically */
.groupChild {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  border-radius: 8px;
}

/* Overlay image stays responsive */
.groupItem {
  position: absolute;
  bottom: -100px;
  left: 50%;
  transform: translateX(-50%);
  width: 20%;
  max-width: 200px;
  height: auto;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 8px;
}

.frameGroup {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding-top: 120px;
}

.revolutionizingTechnologyParent {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.revolutionizingTechnology {
  line-height: 122%;
  text-transform: capitalize;
  font-size: 2.5rem;
}

.innovativeTechnologySolution {
  font-size: 1rem;
  line-height: 130%;
  color: #424242;
  text-align: center;
}

.frameContainer {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 1rem;
  color: #424242;
}

.frameDiv {
  display: flex;
  align-items: center;
}

.starIcon {
  width: 24px;
  height: 24px;
  color: #000; /* Black stars */
}

.b {
  line-height: 160%;
  text-transform: capitalize;
}

.reviews {
  line-height: 160%;
  font-weight: 500;
  color: #616161;
}

/* 📱 Tablet */
@media (max-width: 1024px) {
  .revolutionizingTechnology {
    font-size: 2rem;
  }
  .groupItem {
    width: 25%;
  }
}

/* 📱 Mobile */
@media (max-width: 640px) {
  .revolutionizingTechnology {
    font-size: 1.5rem;
  }
  .innovativeTechnologySolution {
    font-size: 0.9rem;
  }
  .groupItem {
    width: 35%;
  }
}
</style>
