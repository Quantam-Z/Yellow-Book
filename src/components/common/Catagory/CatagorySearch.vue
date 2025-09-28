<template>
    <div :class="$style.frameParent">
          <div :class="$style.mainCategoryParent">
                <div :class="$style.mainCategory">main Category</div>
                <b :class="$style.itSoftware">IT & Software</b>
          </div>
          <div :class="$style.frameGroup">
                <div :class="$style.dellDuotoneParent">
                      <img :class="$style.dellDuotoneIcon" alt="" />
                      <div :class="$style.search">Search </div>
                </div>
                <div :class="$style.searchParent">
                      <div :class="$style.search2">Search</div>
                      <img :class="$style.dellDuotoneIcon" alt="" />
                </div>
          </div>
    </div>
</template>
<style  module>.frameParent {
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 33px;
    text-align: center;
    font-size: 16px;
    color: #28aed8;
    font-family: 'Plus Jakarta Sans';
}
    .mainCategoryParent {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 21px;
    }
    .mainCategory {
          align-self: stretch;
          position: relative;
          line-height: 160%;
          text-transform: capitalize;
    }
    .itSoftware {
          position: relative;
          font-size: 72px;
          line-height: 114%;
          text-transform: capitalize;
          color: #212121;
          text-align: left;
    }
    .frameGroup {
          align-self: stretch;
          border-radius: 4px;
          border: 1px solid #e0e0e0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0px 0px 0px 10px;
          gap: 0px;
          font-size: 14px;
          color: #9e9e9e;
    }
    .dellDuotoneParent {
          display: flex;
          align-items: center;
          gap: 4px;
    }
    .dellDuotoneIcon {
          width: 24px;
          position: relative;
          height: 24px;
    }
    .search {
          position: relative;
          line-height: 170%;
          text-transform: capitalize;
    }
    .searchParent {
          border-radius: 0px 4px 4px 0px;
          background-color: #fff;
          border: 1px solid #e0e0e0;
          display: flex;
          align-items: center;
          padding: 14px 18px;
          gap: 8px;
          font-size: 18px;
          color: #616161;
    }
    .search2 {
          position: relative;
          line-height: 160%;
          text-transform: capitalize;
          font-weight: 500;
    }

</style>