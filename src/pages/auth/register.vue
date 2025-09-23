<template>
  <div>
    <BuisnessReg :isOpen="isModalOpen" @close="closeModal" />
  </div>
</template>

<script>
import BuisnessReg from '~/components/modal/BuisnessReg.vue';

export default {
  components: {
    BuisnessReg,
  },
  data() {
    return {
      isModalOpen: false,
    };
  },
  mounted() {
    this.isModalOpen = true;
  },
  methods: {
    closeModal() {
      this.isModalOpen = false;
    },
  },
};
</script>
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
  color: #424242;
  font-family: 'Plus Jakarta Sans';
}
  .frameGroup {
        align-self: stretch;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 0px;
  }
  .chooseYourRoleParent {
        width: 193px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
  }
  .chooseYourRole {
        align-self: stretch;
        position: relative;
        line-height: 130%;
        text-transform: capitalize;
        font-weight: 600;
  }
  .frameContainer {
        align-self: stretch;
        display: flex;
        align-items: center;
        gap: 18px;
        font-size: 16px;
        color: #616161;
  }
  .frameDiv {
        display: flex;
        align-items: center;
        gap: 4px;
  }
  .frameIcon {
        width: 24px;
        position: relative;
        height: 24px;
  }
  .button {
        position: relative;
        line-height: 160%;
        text-transform: capitalize;
        font-weight: 500;
  }
  .frameParent3 {
        align-self: stretch;
        box-shadow: 0px 4px 16px rgba(168, 168, 168, 0.24);
        border-radius: 8px;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 16px;
        gap: 32px;
        font-size: 16px;
  }
  .loginAsATouristParent {
        width: 376px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        text-align: center;
        font-size: 24px;
  }
  .button3 {
        align-self: stretch;
        position: relative;
        font-size: 16px;
        line-height: 160%;
        text-transform: capitalize;
        font-weight: 500;
        color: #616161;
  }
  .buttonParent {
        width: 440px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
  }
  .button4 {
        align-self: stretch;
        border-radius: 4px;
        background-color: #f6fafd;
        border: 1px solid #dbe7ff;
        box-sizing: border-box;
        height: 46px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 12px 24px;
        gap: 12px;
  }
  .icon {
        width: 20px;
        position: relative;
        max-height: 100%;
        object-fit: cover;
  }
  .lineParent {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 16px;
        text-align: center;
        color: #9e9e9e;
  }
  .frameChild {
        width: 173px;
        position: relative;
        border-top: 1px solid #dbe7ff;
        box-sizing: border-box;
        height: 1px;
  }
  .emailCodeLoginParent {
        align-self: stretch;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 24px;
  }
  .emailCodeLogin {
        align-self: stretch;
        position: relative;
        font-size: 20px;
        line-height: 130%;
        text-transform: capitalize;
        font-weight: 600;
  }
  .buttonGroup {
        align-self: stretch;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
  }
  .button10 {
        align-self: stretch;
        position: relative;
        line-height: 160%;
        text-transform: capitalize;
        font-weight: 500;
  }
  .button11 {
        align-self: stretch;
        border-radius: 4px;
        background-color: #eee;
        border: 1px solid #bdbdbd;
        box-sizing: border-box;
        height: 46px;
        display: flex;
        align-items: center;
        padding: 12px 10px;
        color: #9e9e9e;
  }
  .button12 {
        position: relative;
        line-height: 160%;
        text-transform: capitalize;
        font-weight: 500;
        white-space: pre-wrap;
  }
  .button13 {
        align-self: stretch;
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
  .button14 {
        position: relative;
        line-height: 130%;
        text-transform: capitalize;
        font-weight: 600;
  }
  .frameParent4 {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        gap: 32px;
        font-size: 14px;
  }
  .buttonWrapper {
        display: flex;
        align-items: center;
        justify-content: center;
  }
  .button15 {
        position: relative;
        line-height: 170%;
        text-transform: capitalize;
  }
  .buttonContainer {
        width: 128px;
        display: flex;
        align-items: center;
        justify-content: center;
  }

</style>