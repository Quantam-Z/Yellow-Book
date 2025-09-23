<template>
  <div :class="$style.popularListingsParent">
    <div :class="$style.popularListings">Popular listings</div>

    <div :class="$style.frameParent">
      <div :class="$style.agencyCardParent">
        <img :class="$style.agencyCardIcon" src="/logo/p1.png" alt="listing" />
        <div :class="$style.frameWrapper">
          <div :class="$style.frameGroup">
            <div :class="$style.frameContainer">
              <div :class="$style.revolutionizingTechnologyParent">
                <div :class="$style.revolutionizingTechnology">Revolutionizing Technology</div>
                <div :class="$style.innovativeTechnologySolution">
                  Innovative technology solutions for modern businesses
                </div>
              </div>
              <div :class="$style.frameDiv">
                <Star v-for="i in 5" :key="i" :class="$style.starIcon" />
              </div>
            </div>
            <div :class="$style.pinFillParent">
              <MapPin :class="$style.pinFillIcon" />
              <div :class="$style.ulaanbaatarMongolia">Ulaanbaatar, Mongolia</div>
            </div>
          </div>
        </div>
      </div>

      <div :class="$style.agencyCardParent">
        <img :class="$style.agencyCardIcon" src="/logo/p2.png" alt="listing" />
        <div :class="$style.frameWrapper">
          <div :class="$style.frameGroup">
            <div :class="$style.frameContainer">
              <div :class="$style.revolutionizingTechnologyParent">
                <div :class="$style.revolutionizingTechnology">Creative Agency</div>
                <div :class="$style.innovativeTechnologySolution">
                  Building modern brands with style and vision
                </div>
              </div>
              <div :class="$style.frameDiv">
                <Star v-for="i in 4" :key="i" :class="$style.starIcon" />
              </div>
            </div>
            <div :class="$style.pinFillParent">
              <MapPin :class="$style.pinFillIcon" />
              <div :class="$style.ulaanbaatarMongolia">Tokyo, Japan</div>
            </div>
          </div>
        </div>
      </div>

      <div :class="$style.agencyCardParent">
        <img :class="$style.agencyCardIcon" src="/logo/p3.png" alt="listing" />
        <div :class="$style.frameWrapper">
          <div :class="$style.frameGroup">
            <div :class="$style.frameContainer">
              <div :class="$style.revolutionizingTechnologyParent">
                <div :class="$style.revolutionizingTechnology">Food & Beverage</div>
                <div :class="$style.innovativeTechnologySolution">
                  Fresh, organic, and delicious products
                </div>
              </div>
              <div :class="$style.frameDiv">
                <Star v-for="i in 5" :key="i" :class="$style.starIcon" />
              </div>
            </div>
            <div :class="$style.pinFillParent">
              <MapPin :class="$style.pinFillIcon" />
              <div :class="$style.ulaanbaatarMongolia">Berlin, Germany</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Star, MapPin } from 'lucide-vue-next';
</script>

<style module>
.popularListingsParent {
  width: 100%;
  max-width: 1200px;
  margin: 60px auto 0;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 44px;
  text-align: center;
  font-size: 30px;
  color: #212121;
  font-family: 'Plus Jakarta Sans';
  padding: 0 20px;
  box-sizing: border-box;
}

.popularListings {
  align-self: stretch;
  line-height: 126%;
  text-transform: capitalize;
  font-weight: 600;
}

.frameParent {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch; /* Key change: align-items to stretch */
  gap: 24px;
  font-size: 20px;
  color: #000;
}

.agencyCardParent {
  flex: 1 1 300px; /* This sets the base size and flexibility */
  max-width: 384px;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease;
}

.agencyCardParent:hover {
  transform: translateY(-6px);
}

.agencyCardIcon {
  align-self: stretch;
  max-width: 100%;
  height: 288px;
  object-fit: cover;
}

.frameWrapper {
  width: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column; /* Key change: set to column */
  flex-grow: 1; /* Key change: allow wrapper to grow to fill space */
  align-items: flex-end;
  justify-content: center;
  padding: 16px;
  box-sizing: border-box;
}

.frameGroup {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
}

.frameContainer {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
}

.revolutionizingTechnologyParent {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
}

.revolutionizingTechnology {
  width: 100%;
  line-height: 122%;
  text-transform: capitalize;
  font-weight: 600;
  display: inline-block;
}

.innovativeTechnologySolution {
  width: 100%;
  font-size: 16px;
  line-height: 130%;
  text-transform: capitalize;
  color: #757575;
  text-align: left;
}

.frameDiv {
  display: flex;
  align-items: center;
  gap: 4px;
}

.starIcon {
  width: 22px;
  height: 22px;
  color: #f5c518;
}

.pinFillParent {
  display: flex;
  align-items: center;
  gap: 6px;
  text-align: left;
  font-size: 16px;
  color: #757575;
}

.pinFillIcon {
  width: 20px;
  height: 20px;
  color: #007bff;
}

.ulaanbaatarMongolia {
  line-height: 160%;
  text-transform: capitalize;
  font-weight: 500;
}

/* Responsive */
@media (max-width: 768px) {
  .frameParent {
    flex-direction: column;
    align-items: center;
  }
  .agencyCardParent {
    width: 100%;
    max-width: 384px;
    margin: 0 auto;
  }
}
</style>