<template>
    <div :class="$style.frameParent">
          <div :class="$style.step3of3Parent">
                <div :class="$style.tellUsAbout">Step 3of 3</div>
                <div :class="$style.rectangleParent">
                      <div :class="$style.frameChild" />
                      <div :class="$style.frameChild" />
                      <div :class="$style.frameChild" />
                </div>
          </div>
          <div :class="$style.frameGroup">
                <div :class="$style.tellUsAboutYourselfParent">
                      <div :class="$style.tellUsAbout">Tell Us About Yourself</div>
                      <div :class="$style.button">Complete your profile to start listing your services on Yellow.Book.</div>
                </div>
                <div :class="$style.frameContainer">
                      <div :class="$style.frameDiv">
                            <div :class="$style.step3of3Parent">
                                  <div :class="$style.button2">First Name</div>
                                  <div :class="$style.button3">
                                        <div :class="$style.button4">John</div>
                                  </div>
                            </div>
                            <div :class="$style.step3of3Parent">
                                  <div :class="$style.button2">Last Name</div>
                                  <div :class="$style.button3">
                                        <div :class="$style.button4">Doe</div>
                                  </div>
                            </div>
                            <div :class="$style.step3of3Parent">
                                  <div :class="$style.button2">Job Title</div>
                                  <div :class="$style.button3">
                                        <div :class="$style.button4">e.g., CEO, Travel Agent</div>
                                  </div>
                            </div>
                            <div :class="$style.frameParent2">
                                  <div :class="$style.buttonParent2">
                                        <div :class="$style.button2">Country</div>
                                        <div :class="$style.buttonParent3">
                                              <div :class="$style.button12">
                                                    <img :class="$style.squareFlagOfMongoliaVectorIcon" alt="" />
                                                    <img :class="$style.expandDownIcon" alt="" />
                                              </div>
                                              <div :class="$style.button13">
                                                    <img :class="$style.squareFlagOfMongoliaVectorIcon" alt="" />
                                              </div>
                                              <div :class="$style.button13">
                                                    <img :class="$style.squareFlagOfMongoliaVectorIcon" alt="" />
                                              </div>
                                              <div :class="$style.button15">
                                                    <img :class="$style.squareFlagOfMongoliaVectorIcon" alt="" />
                                              </div>
                                        </div>
                                  </div>
                                  <div :class="$style.buttonParent4">
                                        <div :class="$style.button2">Phone Number</div>
                                        <div :class="$style.button3">
                                              <div :class="$style.button18">+976  </div>
                                        </div>
                                  </div>
                            </div>
                      </div>
                      <div :class="$style.buttonParent5">
                            <div :class="$style.button19">
                                  <div :class="$style.button20">Back</div>
                            </div>
                            <div :class="$style.button21">
                                  <div :class="$style.button22">Next</div>
                            </div>
                      </div>
                </div>
          </div>
    </div>
</template>
<style  module>.frameParent {
    position: relative;
    border-radius: 12px;
    background-color: #fff;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    box-sizing: border-box;
    gap: 32px;
    text-align: left;
    font-size: 20px;
    color: #1877f2;
    font-family: 'Plus Jakarta Sans';
}
    .step3of3Parent {
          align-self: stretch;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 16px;
    }
    .rectangleParent {
          display: flex;
          align-items: flex-start;
          gap: 16px;
    }
    .frameChild {
          width: 158px;
          position: relative;
          border-radius: 4px;
          background-color: #1877f2;
          height: 8px;
    }
    .frameGroup {
          align-self: stretch;
          box-shadow: 0px 4px 16px rgba(168, 168, 168, 0.24);
          border-radius: 8px;
          background-color: #fff;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 16px;
          gap: 32px;
          text-align: center;
          font-size: 24px;
          color: #424242;
    }
    .tellUsAboutYourselfParent {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
    }
    .tellUsAbout {
          align-self: stretch;
          position: relative;
          line-height: 130%;
          text-transform: capitalize;
          font-weight: 600;
    }
    .button {
          width: 320px;
          position: relative;
          font-size: 16px;
          line-height: 160%;
          text-transform: capitalize;
          font-weight: 500;
          color: #616161;
          display: inline-block;
    }
    .frameContainer {
          align-self: stretch;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 24px;
          text-align: left;
          font-size: 16px;
    }
    .frameDiv {
          align-self: stretch;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 20px;
    }
    .button2 {
          align-self: stretch;
          position: relative;
          line-height: 160%;
          text-transform: capitalize;
          font-weight: 500;
    }
    .button3 {
          align-self: stretch;
          border-radius: 4px;
          background-color: #eee;
          border: 1px solid #bdbdbd;
          box-sizing: border-box;
          height: 46px;
          display: flex;
          align-items: center;
          padding: 12px;
          color: #9e9e9e;
    }
    .button4 {
          position: relative;
          line-height: 160%;
          text-transform: capitalize;
          font-weight: 500;
    }
    .frameParent2 {
          align-self: stretch;
          display: flex;
          align-items: flex-start;
          gap: 20px;
    }
    .buttonParent2 {
          width: 123px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 16px;
    }
    .buttonParent3 {
          align-self: stretch;
          border-radius: 4px;
          border: 1px solid #bdbdbd;
          box-sizing: border-box;
          height: 44px;
          overflow: hidden;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
    }
    .button12 {
          align-self: stretch;
          background-color: #fafafa;
          border-bottom: 1px solid #bdbdbd;
          box-sizing: border-box;
          height: 44.5px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px;
          gap: 0px;
    }
    .squareFlagOfMongoliaVectorIcon {
          width: 24px;
          position: relative;
          max-height: 100%;
          object-fit: cover;
    }
    .expandDownIcon {
          width: 24px;
          position: relative;
          height: 24px;
    }
    .button13 {
          align-self: stretch;
          background-color: #f6fafd;
          border-bottom: 1px solid #bdbdbd;
          box-sizing: border-box;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px;
    }
    .button15 {
          align-self: stretch;
          background-color: #f6fafd;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px;
          box-sizing: border-box;
    }
    .buttonParent4 {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 16px;
    }
    .button18 {
          position: relative;
          line-height: 160%;
          text-transform: capitalize;
          font-weight: 500;
          white-space: pre-wrap;
    }
    .buttonParent5 {
          align-self: stretch;
          display: flex;
          align-items: flex-start;
          gap: 24px;
          color: #fafafa;
    }
    .button19 {
          flex: 1;
          border-radius: 4px;
          background-color: #424242;
          border: 1px solid #dbe7ff;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 18px 24px;
    }
    .button20 {
          position: relative;
          line-height: 160%;
          text-transform: capitalize;
          font-weight: 600;
    }
    .button21 {
          flex: 0.8743;
          border-radius: 4px;
          background-color: #fcc207;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 18px 36px;
          box-sizing: border-box;
          text-align: center;
          color: #212121;
    }
    .button22 {
          position: relative;
          line-height: 130%;
          text-transform: capitalize;
          font-weight: 600;
    }

</style>