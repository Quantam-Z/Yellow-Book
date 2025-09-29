<template>
    <div :class="$style.frameParent">
      <div :class="$style.mainCategoryParent">
        <div :class="$style.mainCategory">main Category</div>
        <b :class="$style.itSoftware">IT & Software</b>
      </div>
      <div :class="$style.frameGroup">
        <div :class="$style.dellDuotoneParent">
          <svg :class="$style.dellDuotoneIcon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="#9e9e9e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <div :class="$style.search">Search </div>
        </div>
        <div :class="$style.searchParent">
          <div :class="$style.search2">Search</div>
          <svg :class="$style.dellDuotoneIcon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="#616161" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  </template>
  
  <style module>
  .frameParent {
    width: 50%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 33px;
    text-align: center;
    font-size: 16px;
    color: #28aed8;
    font-family: 'Plus Jakarta Sans';
    padding: 0 20px;
    box-sizing: border-box;
    margin: 0 auto 10px auto;
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
    max-width: 100%;
    box-sizing: border-box;
  }
  
  .dellDuotoneParent {
    display: flex;
    align-items: center;
    gap: 4px;
    flex: 1;
    min-width: 0;
  }
  
  .dellDuotoneIcon {
    width: 24px;
    position: relative;
    height: 24px;
    flex-shrink: 0;
  }
  
  .search {
    position: relative;
    line-height: 170%;
    text-transform: capitalize;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
    flex-shrink: 0;
  }
  
  .search2 {
    position: relative;
    line-height: 160%;
    text-transform: capitalize;
    font-weight: 500;
    white-space: nowrap;
  }
  
  /* Responsive breakpoints */
  @media (max-width: 768px) {
    .frameParent {
      gap: 25px;
      padding: 0 15px;
    }
    
    .mainCategoryParent {
      gap: 15px;
    }
    
    .itSoftware {
      font-size: 48px;
    }
    
    .frameGroup {
      font-size: 12px;
      padding: 0px 0px 0px 8px;
    }
    
    .dellDuotoneParent {
      gap: 2px;
    }
    
    .dellDuotoneIcon {
      width: 20px;
      height: 20px;
    }
    
    .searchParent {
      padding: 12px 14px;
      gap: 6px;
      font-size: 16px;
    }
  }
  
  @media (max-width: 480px) {
    .frameParent {
      gap: 20px;
      padding: 0 10px;
    }
    
    .mainCategoryParent {
      gap: 12px;
    }
    
    .itSoftware {
      font-size: 36px;
      text-align: center;
    }
    
    .frameGroup {
      font-size: 11px;
      padding: 0px 0px 0px 6px;
    }
    
    .dellDuotoneIcon {
      width: 18px;
      height: 18px;
    }
    
    .searchParent {
      padding: 10px 12px;
      gap: 4px;
      font-size: 14px;
    }
    
    .search {
      display: none;
    }
  }
  
  @media (max-width: 360px) {
    .itSoftware {
      font-size: 28px;
    }
  }
  </style>