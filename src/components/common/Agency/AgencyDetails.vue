<template>
      <div :class="$style.aboutTheAgencyParent">
        <div :class="$style.aboutTheAgency">About the Agency</div>
        <div :class="$style.mongoliaExplorerTravel">
          Mongolia Explorer Travel specializes in authentic Mongolian adventures, offering unique cultural experiences and breathtaking wilderness tours. With over 8 years of expertise, we provide unforgettable journeys through the vast steppes, dramatic landscapes, and rich nomadic heritage of Mongolia.
        </div>
      </div>
    </template>
    
    <style module>
    .aboutTheAgencyParent {
      width: 100%;
      position: relative;
      background-color: #fff5f5;
      border: 1px solid #eee;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 32px;
      gap: 24px;
      text-align: left;
      font-size: 24px;
      color: #424242;
      font-family: 'Plus Jakarta Sans';
      margin-top: 10px;
      margin-bottom: 10px;
    }
    
    .aboutTheAgency {
      position: relative;
      line-height: 130%;
      text-transform: capitalize;
      font-weight: 500;
    }
    
    .mongoliaExplorerTravel {
      align-self: stretch;
      position: relative;
      font-size: 16px;
      line-height: 160%;
      text-transform: capitalize;
      font-weight: 500;
      color: #616161;
    }
    
    /* ✅ Responsive Styles */
    @media (max-width: 1024px) {
      .aboutTheAgencyParent {
        padding: 24px;
        font-size: 20px;
      }
    }
    
    @media (max-width: 768px) {
      .aboutTheAgencyParent {
        padding: 20px;
        gap: 16px;
      }
      .aboutTheAgency {
        font-size: 18px;
      }
      .mongoliaExplorerTravel {
        font-size: 15px;
        line-height: 150%;
      }
    }
    
    @media (max-width: 480px) {
      .aboutTheAgencyParent {
        padding: 16px;
        gap: 12px;
      }
      .aboutTheAgency {
        font-size: 16px;
        text-align: center;
        width: 100%;
      }
      .mongoliaExplorerTravel {
        font-size: 14px;
        text-align: justify;
      }
    }
    </style>
    