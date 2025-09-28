<template>
  <div :class="$style.groupParent">
    <div :class="$style.frameParent">
      <img :class="$style.groupChild" src="/logo/image6.png" alt="Main background" />
      <img :class="$style.groupItem" src="/logo/image7.png" alt="Overlay logo" />
    </div>
      <div :class="$style.frameGroup">
          <div :class="$style.revolutionizingTechnologyParent">
              <div :class="$style.revolutionizingTechnology">Revolutionizing Technology</div>
              <div :class="$style.innovativeTechnologySolution">Innovative technology solutions for modern businesses</div>
          </div>
          <div :class="$style.frameContainer">
              <div :class="$style.frameDiv">
                  <img :class="$style.frameIcon" alt="" />
                  <img :class="$style.frameIcon" alt="" />
                  <img :class="$style.frameIcon" alt="" />
                  <img :class="$style.frameIcon" alt="" />
                  <img :class="$style.frameIcon" alt="" />
              </div>
              <b :class="$style.b">4.8</b>
              <div :class="$style.reviews">(458 reviews)</div>
          </div>
      </div>
  </div>
</template>
<style  module>.groupParent {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  text-align: left;
  font-size: 46px;
  color: #000;
  font-family: 'Plus Jakarta Sans';
}
  .frameParent {
      width: 1200px;
      position: relative;
      height: 700px;
  }
  .groupChild {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 1200px;
      height: 600px;
      object-fit: cover;
  }
  .groupItem {
      position: absolute;
      top: 500px;
      left: calc(50% - 100px);
      border-radius: 4px;
      width: 200px;
      height: 200px;
      object-fit: cover;
  }
  .frameGroup {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
  }
  .revolutionizingTechnologyParent {
      align-self: stretch;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 24px;
  }
  .revolutionizingTechnology {
      position: relative;
      line-height: 122%;
      text-transform: capitalize;
  }
  .innovativeTechnologySolution {
      align-self: stretch;
      position: relative;
      font-size: 16px;
      line-height: 130%;
      text-transform: capitalize;
      color: #424242;
      text-align: center;
  }
  .frameContainer {
      display: flex;
      align-items: center;
      gap: 7px;
      font-size: 16px;
      color: #424242;
  }
  .frameDiv {
      display: flex;
      align-items: center;
  }
  .frameIcon {
      width: 24px;
      position: relative;
      height: 24px;
  }
  .b {
      position: relative;
      line-height: 160%;
      text-transform: capitalize;
  }
  .reviews {
      position: relative;
      line-height: 160%;
      text-transform: capitalize;
      font-weight: 500;
      color: #616161;
  }

</style>