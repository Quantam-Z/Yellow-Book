<template>
    <div :class="$style.frameParent">
          <div :class="$style.trustedHelpRightWhenYouNParent">
                <div :class="$style.trustedHelpRight">Trusted Help, Right When You Need It</div>
                <div :class="$style.reliableSupportFrom">Reliable support from real people, solving everyday problems with care, speed, and integrity.</div>
          </div>
          <div :class="$style.frameChild" />
          <div :class="$style.frameItem" />
          <img :class="$style.frameInner" alt="" />
          <div :class="$style.ellipseDiv" />
          <div :class="$style.frameChild2" />
          <div :class="$style.frameGroup">
                <img :class="$style.frameIcon" alt="" />
                <div :class="$style.frameContainer">
                      <div :class="$style.frameDiv">
                            <img :class="$style.frameIcon" alt="" />
                            <img :class="$style.frameIcon" alt="" />
                      </div>
                      <div :class="$style.frameParent2">
                            <img :class="$style.frameIcon" alt="" />
                            <img :class="$style.frameIcon" alt="" />
                      </div>
                </div>
          </div>
          <img :class="$style.subtractIcon" alt="" />
          <img :class="$style.subtractIcon2" alt="" />
          <img :class="$style.subtractIcon3" alt="" />
          <img :class="$style.subtractIcon3" alt="" />
          <img :class="$style.subtractIcon5" alt="" />
          <img :class="$style.subtractIcon6" alt="" />
          <img :class="$style.subtractIcon6" alt="" />
          <img :class="$style.imageYoungWomanLookingMobiIcon" alt="" />
          <div :class="$style.frameParent3">
                <img :class="$style.frameIcon" alt="" />
                <div :class="$style.trusted">Trusted</div>
          </div>
          <div :class="$style.commentFillParent">
                <img :class="$style.commentFillIcon" alt="" />
                <div :class="$style.trusted">Honest Feedback</div>
          </div>
          <div :class="$style.frameParent4">
                <img :class="$style.frameIcon" alt="" />
                <div :class="$style.trusted">5 Star rating</div>
          </div>
    </div>
</template>
<style  module>.frameParent {
    width: 100%;
    position: relative;
    background: linear-gradient(90deg, #d73573, #ff9c5e);
    height: 300px;
    overflow: hidden;
    text-align: left;
    font-size: 16px;
    color: #fff;
    font-family: 'Plus Jakarta Sans';
}
    .trustedHelpRightWhenYouNParent {
          position: absolute;
          top: calc(50% - 74px);
          left: 24px;
          width: 601px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 26px;
          font-size: 46px;
    }
    .trustedHelpRight {
          align-self: stretch;
          position: relative;
          line-height: 122%;
          text-transform: capitalize;
          font-weight: 500;
    }
    .reliableSupportFrom {
          width: 501px;
          position: relative;
          font-size: 16px;
          line-height: 130%;
          text-transform: capitalize;
          display: inline-block;
    }
    .frameChild {
          position: absolute;
          top: -62.13px;
          left: 796.03px;
          border-radius: 10px;
          width: 300px;
          height: 300px;
          transform:  rotate(45deg);
          transform-origin: 0 0;
    }
    .frameItem {
          position: absolute;
          top: -62.13px;
          left: 900.29px;
          box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
          border-radius: 10px;
          background: linear-gradient(180deg, #272eb0, #10134a);
          width: 300px;
          height: 300px;
          transform:  rotate(45deg);
          transform-origin: 0 0;
    }
    .frameInner {
          position: absolute;
          top: -144.13px;
          left: 792.42px;
          border-radius: 10px;
          width: 588.3px;
          height: 588.3px;
          object-fit: contain;
    }
    .ellipseDiv {
          position: absolute;
          top: 25px;
          left: 625px;
          border-radius: 50%;
          background-color: #fff;
          width: 67px;
          height: 67px;
    }
    .frameChild2 {
          position: absolute;
          top: 185px;
          left: 558px;
          border-radius: 50%;
          background-color: #fff;
          width: 42px;
          height: 42px;
    }
    .frameGroup {
          position: absolute;
          top: 242px;
          left: calc(50% - 71px);
          width: 142px;
          display: flex;
          flex-direction: column;
          align-items: center;
    }
    .frameIcon {
          width: 24px;
          position: relative;
          height: 24px;
    }
    .frameContainer {
          align-self: stretch;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: -10px;
          position: relative;
    }
    .frameDiv {
          width: 95px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0px;
    }
    .frameParent2 {
          align-self: stretch;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0px;
          margin-top: -4px;
          position: relative;
    }
    .subtractIcon {
          position: relative;
          width: 14px;
          height: 14px;
    }
    .subtractIcon2 {
          position: relative;
          width: 11px;
          height: 11px;
    }
    .subtractIcon3 {
          position: relative;
          width: 5px;
          height: 5px;
    }
    .subtractIcon5 {
          position: relative;
          width: 6px;
          height: 6px;
    }
    .subtractIcon6 {
          position: relative;
          width: 4px;
          height: 4px;
    }
    .imageYoungWomanLookingMobiIcon {
          position: absolute;
          top: 5px;
          right: 33px;
          width: 319px;
          height: 295px;
          object-fit: cover;
    }
    .frameParent3 {
          position: absolute;
          top: 30px;
          left: 1087px;
          box-shadow: 0px 4px 19px rgba(0, 0, 0, 0.19);
          border-radius: 4px;
          background-color: rgba(255, 255, 255, 0.24);
          display: flex;
          align-items: center;
          padding: 5px 10px;
    }
    .trusted {
          position: relative;
          line-height: 160%;
          text-transform: capitalize;
          font-weight: 600;
    }
    .commentFillParent {
          position: absolute;
          top: 166px;
          left: 720px;
          box-shadow: 0px 4px 19px rgba(0, 0, 0, 0.19);
          border-radius: 4px;
          background-color: rgba(255, 255, 255, 0.24);
          display: flex;
          align-items: center;
          padding: 5px 10px;
    }
    .commentFillIcon {
          width: 24px;
          position: relative;
          height: 24px;
          object-fit: cover;
    }
    .frameParent4 {
          position: absolute;
          top: 42px;
          left: 792px;
          box-shadow: 0px 4px 19px rgba(0, 0, 0, 0.19);
          border-radius: 4px;
          background-color: rgba(255, 255, 255, 0.24);
          overflow: hidden;
          display: flex;
          align-items: center;
          padding: 5px 10px;
    }

</style>