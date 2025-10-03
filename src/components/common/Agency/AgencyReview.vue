<template>
    <div class="reviews-container">
      <div class="main-content">
        <div class="reviews-section">
          <!-- Header -->
          <div class="header">
            <div class="title-section">
              <MessageCircle :size="24" />
              <div class="title">{{ pageTitle }}</div>
            </div>
            <div class="action-buttons">
              <button class="filter-btn">
                <span>{{ filterText }}</span>
                <ChevronDown :size="20" />
              </button>
              <button class="website-btn">
                <span>{{ websiteText }}</span>
                <ExternalLink :size="20" />
              </button>
            </div>
          </div>
  
          <!-- Reviews List -->
          <div class="reviews-list">
            <div 
              v-for="review in reviews" 
              :key="review.id"
              class="review-card"
            >
              <div class="review-content">
                <div class="reviewer-info">
                  <img 
                    :src="review.avatar || '/api/placeholder/44/44'" 
                    :alt="review.name"
                    class="avatar"
                  />
                  <div class="reviewer-details">
                    <div class="reviewer-name">{{ review.name }}</div>
                    <div class="rating-stars">
                      <Star 
                        v-for="star in 5" 
                        :key="star"
                        :size="20"
                        :class="{ 'filled': star <= review.rating }"
                        class="star"
                      />
                    </div>
                  </div>
                </div>
                <div class="review-text-section">
                  <div class="review-text">
                    "{{ review.text }}"
                  </div>
                  <div class="review-date">{{ formatDate(review.date) }}</div>
                </div>
              </div>
              
              <div class="divider"></div>
              
              <div class="review-actions">
                <button class="action-btn" @click="likeReview(review.id)">
                  <ThumbsUp :size="20" />
                  <span>{{ review.likes }}</span>
                </button>
                <button class="action-btn" @click="dislikeReview(review.id)">
                  <ThumbsDown :size="20" />
                  <span>{{ review.dislikes }}</span>
                </button>
              </div>
  
              <!-- Company Response -->
              <div v-if="review.companyResponse" class="company-response">
                <div class="response-indicator"></div>
                <div class="response-header">
                  <img 
                    :src="review.companyResponse.avatar || '/api/placeholder/44/44'" 
                    :alt="review.companyResponse.name"
                    class="avatar"
                  />
                  <div class="company-details">
                    <div class="company-name">{{ review.companyResponse.name }}</div>
                    <div class="response-date">{{ formatDate(review.companyResponse.date) }}</div>
                  </div>
                </div>
                <div class="response-text">
                  "{{ review.companyResponse.text }}"
                </div>
              </div>
            </div>
          </div>
  
          <!-- Add Review Section -->
          <div class="add-review-section">
            <div class="rating-input-section">
              <div class="rating-title">{{ addReviewTitle }}</div>
              <div class="rating-input">
                <Star 
                  v-for="star in 5" 
                  :key="star"
                  :size="28"
                  :class="{ 'filled': star <= newReviewRating }"
                  class="star clickable"
                  @click="setRating(star)"
                />
              </div>
            </div>
            <div class="review-input-section">
              <textarea 
                v-model="newReviewText"
                :placeholder="reviewPlaceholder"
                class="review-textarea"
              ></textarea>
              <button class="submit-btn" @click="submitReview">
                <span>{{ submitText }}</span>
              </button>
            </div>
          </div>
        </div>
  
        <!-- Filter Panel -->
        <div v-if="showFilter" class="filter-panel">
          <div class="filter-header">
            <span class="filter-title">{{ filterTitle }}</span>
            <button @click="toggleFilter" class="close-filter">
              <X :size="20" />
            </button>
          </div>
          <div class="filter-content">
            <!-- Review Score Filter -->
            <div class="filter-section">
              <div class="filter-section-title">{{ reviewScoreTitle }}</div>
              <div class="filter-options">
                <label 
                  v-for="star in 5" 
                  :key="star"
                  class="filter-option"
                >
                  <input 
                    type="checkbox" 
                    v-model="selectedRatings" 
                    :value="star"
                    class="filter-checkbox"
                  />
                  <Star :size="16" class="star filled" />
                  <span>{{ star }} Star{{ star > 1 ? 's' : '' }}</span>
                </label>
              </div>
            </div>
  
            <!-- Date Filter -->
            <div class="filter-section">
              <div class="filter-section-title">{{ dateFilterTitle }}</div>
              <div class="filter-options">
                <label 
                  v-for="option in dateFilterOptions" 
                  :key="option.value"
                  class="filter-option"
                >
                  <input 
                    type="radio" 
                    v-model="selectedDateFilter" 
                    :value="option.value"
                    name="dateFilter"
                    class="filter-radio"
                  />
                  <Clock :size="16" />
                  <span>{{ option.label }}</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Rating Summary Panel -->
      <div class="rating-summary">
        <div class="overall-rating">
          <div class="rating-score-section">
            <div class="main-score">{{ overallRating.toFixed(1) }}</div>
            <div class="rating-label">{{ ratingLabel }}</div>
          </div>
          <div class="rating-overview">
            <div class="stars-display">
              <Star 
                v-for="star in 5" 
                :key="star"
                :size="20"
                :class="{ 'filled': star <= Math.round(overallRating) }"
                class="star"
              />
            </div>
            <div class="total-reviews">({{ totalReviews }} reviews)</div>
          </div>
        </div>
  
        <!-- Rating Breakdown -->
        <div class="rating-breakdown">
          <div 
            v-for="(count, rating) in ratingBreakdown" 
            :key="rating"
            class="rating-row"
          >
            <div class="rating-number">
              <span>{{ rating }}</span>
              <Star :size="16" class="star filled" />
            </div>
            <div class="progress-bar">
              <div 
                class="progress-fill"
                :style="{ width: `${(count / totalReviews) * 100}%` }"
              ></div>
            </div>
            <div class="rating-count">{{ count }}</div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { 
    MessageCircle, 
    ChevronDown, 
    ExternalLink, 
    Star, 
    ThumbsUp, 
    ThumbsDown, 
    X, 
    Clock 
  } from 'lucide-vue-next'
  
  export default {
    name: 'CustomerReviews',
    components: {
      MessageCircle,
      ChevronDown,
      ExternalLink,
      Star,
      ThumbsUp,
      ThumbsDown,
      X,
      Clock
    },
    data() {
      return {
        // UI Text (can be props later for i18n)
        pageTitle: 'Customer Reviews',
        filterText: 'Filter',
        websiteText: 'Go to website',
        addReviewTitle: 'Give me your rating & Review',
        reviewPlaceholder: 'Write here your Review for this company...',
        submitText: 'Submit',
        filterTitle: 'Filter',
        reviewScoreTitle: 'Review Score',
        dateFilterTitle: 'Date filter',
        ratingLabel: 'Excellent',
        
        // Filter state
        showFilter: false,
        selectedRatings: [],
        selectedDateFilter: 'all',
        
        // New review state
        newReviewRating: 0,
        newReviewText: '',
        
        // Sample data (will be replaced with API data)
        reviews: [
          {
            id: 1,
            name: 'Cameron Williamson',
            avatar: '/api/placeholder/44/44',
            rating: 5,
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea',
            date: '2025-07-08',
            likes: 458,
            dislikes: 457,
            companyResponse: {
              name: 'Company Name',
              avatar: '/api/placeholder/44/44',
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
              date: '2025-07-08'
            }
          },
          {
            id: 2,
            name: 'Cameron Williamson',
            avatar: '/api/placeholder/44/44',
            rating: 4,
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea',
            date: '2025-07-08',
            likes: 458,
            dislikes: 457,
            companyResponse: {
              name: 'Company Name',
              avatar: '/api/placeholder/44/44',
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
              date: '2025-07-08'
            }
          },
          {
            id: 3,
            name: 'Cameron Williamson',
            avatar: '/api/placeholder/44/44',
            rating: 5,
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea',
            date: '2025-07-08',
            likes: 458,
            dislikes: 457
          }
        ],
        
        dateFilterOptions: [
          { value: 'all', label: 'All Reviews' },
          { value: '30', label: 'Last 30 Days' },
          { value: '90', label: 'Last 3 Months' },
          { value: '180', label: 'Last 6 Months' },
          { value: '365', label: 'Last 12 Months' }
        ]
      }
    },
    
    computed: {
      totalReviews() {
        return this.reviews.length
      },
      
      overallRating() {
        if (this.reviews.length === 0) return 0
        const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0)
        return sum / this.reviews.length
      },
      
      ratingBreakdown() {
        const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
        this.reviews.forEach(review => {
          breakdown[review.rating]++
        })
        return breakdown
      }
    },
    
    methods: {
      toggleFilter() {
        this.showFilter = !this.showFilter
      },
      
      formatDate(dateString) {
        const date = new Date(dateString)
        return `Date: ${date.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        })}`
      },
      
      setRating(rating) {
        this.newReviewRating = rating
      },
      
      submitReview() {
        if (this.newReviewRating === 0 || !this.newReviewText.trim()) {
          alert('Please provide both rating and review text')
          return
        }
        
        // Here you would typically send to API
        console.log('Submitting review:', {
          rating: this.newReviewRating,
          text: this.newReviewText
        })
        
        // Reset form
        this.newReviewRating = 0
        this.newReviewText = ''
      },
      
      likeReview(reviewId) {
        const review = this.reviews.find(r => r.id === reviewId)
        if (review) {
          review.likes++
        }
      },
      
      dislikeReview(reviewId) {
        const review = this.reviews.find(r => r.id === reviewId)
        if (review) {
          review.dislikes++
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .reviews-container {
    width: 95%;
    margin-left: 30px;
    display: flex;
    gap: 20px;
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    color: #424242;
    line-height: 1.5;
  }
  
  /* Main Content */
  .main-content {
    flex: 1;
    max-width: 792px;
    position: relative;
  }
  
  .reviews-section {
    border-radius: 4px;
    background-color: #fafafa;
    border: 1px solid #eee;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
  
  /* Header */
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    flex-wrap: wrap;
  }
  
  .title-section {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .title {
    font-size: 24px;
    font-weight: 500;
    line-height: 1.3;
    text-transform: capitalize;
  }
  
  .action-buttons {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
  }
  
  .filter-btn, .website-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #757575;
    background: transparent;
    color: #424242;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .website-btn {
    border-color: #28aed8;
    color: #28aed8;
  }
  
  .filter-btn:hover, .website-btn:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  /* Reviews List */
  .reviews-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .review-card {
    background: white;
    border-radius: 4px;
    box-shadow: 0 4px 16px rgba(158, 158, 158, 0.14);
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .review-content {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  .reviewer-info {
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }
  
  .avatar {
    width: 44px;
    height: 44px;
    border-radius: 22px;
    object-fit: cover;
  }
  
  .reviewer-details {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  
  .reviewer-name {
    font-size: 18px;
    font-weight: 600;
    line-height: 1.3;
    text-transform: capitalize;
  }
  
  .rating-stars {
    display: flex;
    align-items: center;
    gap: 2px;
  }
  
  .star {
    color: #e0e0e0;
    transition: color 0.2s;
  }
  
  .star.filled {
    color: #ffc107;
  }
  
  .star.clickable {
    cursor: pointer;
  }
  
  .star.clickable:hover {
    color: #ffc107;
  }
  
  .review-text-section {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  
  .review-text {
    font-size: 16px;
    line-height: 1.6;
    font-style: italic;
    text-transform: capitalize;
  }
  
  .review-date {
    font-size: 16px;
    line-height: 1.6;
    font-weight: 500;
    color: #bdbdbd;
    text-transform: capitalize;
  }
  
  .divider {
    height: 1px;
    background-color: #eee;
  }
  
  .review-actions {
    display: flex;
    align-items: center;
    gap: 21px;
  }
  
  .action-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background: none;
    border: none;
    color: #616161;
    cursor: pointer;
    font-size: 16px;
    transition: color 0.2s;
  }
  
  .action-btn:hover {
    color: #424242;
  }
  
  /* Company Response */
  .company-response {
    position: relative;
    padding: 20px 40px;
    margin-left: 20px;
  }
  
  .response-indicator {
    position: absolute;
    top: -12px;
    left: 12px;
    width: 33px;
    height: 57px;
    border-left: 1px solid #bdbdbd;
    border-bottom: 1px solid #bdbdbd;
    border-radius: 0 0 0 12px;
  }
  
  .response-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
  }
  
  .company-details {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  
  .company-name {
    font-size: 18px;
    font-weight: 600;
    line-height: 1.3;
    text-transform: capitalize;
  }
  
  .response-date {
    font-size: 16px;
    line-height: 1.6;
    font-weight: 500;
    color: #bdbdbd;
    text-transform: capitalize;
  }
  
  .response-text {
    font-size: 16px;
    line-height: 1.6;
    font-style: italic;
    text-transform: capitalize;
  }
  
  /* Add Review Section */
  .add-review-section {
    background: white;
    border: 1px solid #bdbdbd;
    border-radius: 8px;
    box-shadow: 0 0 17px rgba(97, 97, 97, 0.16);
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
  
  .rating-input-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 28px;
    text-align: center;
  }
  
  .rating-title {
    font-size: 18px;
    font-weight: 500;
    line-height: 1.3;
    text-transform: capitalize;
  }
  
  .rating-input {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .review-input-section {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .review-textarea {
    width: 100%;
    min-height: 93px;
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 8px;
    background-color: #f5f5f5;
    font-size: 16px;
    font-weight: 500;
    color: #424242;
    resize: vertical;
    font-family: inherit;
  }
  
  .review-textarea::placeholder {
    color: #9e9e9e;
    text-transform: capitalize;
  }
  
  .submit-btn {
    width: 100%;
    height: 48px;
    background-color: #fcc207;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 500;
    color: #212121;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .submit-btn:hover {
    background-color: #e6af06;
  }
  
  /* Filter Panel */
  .filter-panel {
    position: absolute;
    top: 64px;
    right: 0;
    width: 274px;
    background: white;
    border: 1px solid #eee;
    border-radius: 4px;
    box-shadow: 0 4px 14px rgba(158, 158, 158, 0.1);
    z-index: 10;
  }
  
  .filter-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #424242;
    color: #fafafa;
    padding: 12px 16px;
  }
  
  .filter-title {
    font-size: 16px;
    font-weight: 600;
    line-height: 1.3;
    text-transform: capitalize;
  }
  
  .close-filter {
    background: none;
    border: none;
    color: #fafafa;
    cursor: pointer;
    padding: 4px;
  }
  
  .filter-content {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .filter-section {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .filter-section-title {
    font-size: 18px;
    font-weight: 500;
    line-height: 1.3;
    text-transform: capitalize;
  }
  
  .filter-options {
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .filter-option {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    line-height: 1.6;
    color: #616161;
    cursor: pointer;
  }
  
  .filter-checkbox, .filter-radio {
    margin: 0;
  }
  
  /* Rating Summary Panel */
  .rating-summary {
    width: 384px;
    background: white;
    border-radius: 4px;
    box-shadow: 0 4px 16px rgba(158, 158, 158, 0.24);
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    height: fit-content;
  }
  
  .overall-rating {
    display: flex;
    align-items: center;
    gap: 24px;
  }
  
  .rating-score-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    text-align: center;
  }
  
  .main-score {
    font-size: 46px;
    font-weight: 600;
    line-height: 1.2;
    color: #000;
  }
  
  .rating-label {
    font-size: 16px;
    font-weight: 500;
    line-height: 1.6;
    color: #0bab4b;
    text-transform: capitalize;
  }
  
  .rating-overview {
    display: flex;
    flex-direction: column;
    gap: 7px;
  }
  
  .stars-display {
    display: flex;
    align-items: center;
  }
  
  .total-reviews {
    font-size: 16px;
    font-weight: 500;
    line-height: 1.6;
    color: #616161;
    text-transform: capitalize;
  }
  
  .rating-breakdown {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  
  .rating-row {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  
  .rating-number {
    width: 43px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 6px;
    font-size: 20px;
    font-weight: 400;
    color: #424242;
  }
  
  .progress-bar {
    flex: 1;
    height: 5px;
    background-color: #e0e0e0;
    border-radius: 3px;
    overflow: hidden;
  }
  
  .progress-fill {
    height: 100%;
    background-color: #ffc107;
    transition: width 0.3s;
  }
  
  .rating-count {
    width: 30px;
    font-size: 16px;
    font-weight: 500;
    color: #616161;
    text-align: right;
  }

  /* ===== RESPONSIVE DESIGN ===== */

  /* Large Desktop (1200px and above) */
  @media screen and (min-width: 1200px) {
    .reviews-container {
      width: 95%;
      margin-left: 30px;
    }
  }

  /* Desktop (992px to 1199px) */
  @media screen and (max-width: 1199px) {
    .reviews-container {
      width: 97%;
      margin-left: 15px;
      gap: 15px;
    }
    
    .rating-summary {
      width: 350px;
    }
  }

  /* Tablet (768px to 991px) */
  @media screen and (max-width: 991px) {
    .reviews-container {
      flex-direction: column;
      width: 100%;
      margin-left: 0;
      gap: 20px;
      padding: 0 15px;
    }
    
    .main-content {
      max-width: 100%;
    }
    
    .rating-summary {
      width: 100%;
      max-width: 792px;
      margin: 0 auto;
    }
    
    .overall-rating {
      justify-content: center;
      text-align: center;
    }
    
    .reviews-section {
      padding: 15px;
    }
    
    .header {
      flex-direction: column;
      align-items: stretch;
      gap: 15px;
    }
    
    .action-buttons {
      justify-content: center;
    }
  }

  /* Mobile Landscape (576px to 767px) */
  @media screen and (max-width: 767px) {
    .reviews-container {
      padding: 0 10px;
      gap: 15px;
    }
    
    .reviews-section {
      padding: 15px;
      gap: 24px;
    }
    
    .review-card {
      padding: 15px;
      gap: 15px;
    }
    
    .add-review-section {
      padding: 15px;
      gap: 24px;
    }
    
    .rating-input-section {
      gap: 20px;
    }
    
    .review-textarea {
      padding: 15px;
      min-height: 80px;
    }
    
    .company-response {
      padding: 15px 20px;
      margin-left: 10px;
    }
    
    .response-indicator {
      left: 8px;
      width: 25px;
      height: 45px;
    }
    
    .rating-summary {
      padding: 15px;
    }
    
    .main-score {
      font-size: 36px;
    }
    
    .rating-label {
      font-size: 14px;
    }
  }

  /* Mobile Portrait (575px and below) */
  @media screen and (max-width: 575px) {
    .reviews-container {
      padding: 0 8px;
      gap: 12px;
    }
    
    .reviews-section {
      padding: 12px;
      gap: 20px;
    }
    
    .title {
      font-size: 20px;
    }
    
    .action-buttons {
      flex-direction: column;
      width: 100%;
      gap: 10px;
    }
    
    .filter-btn, .website-btn {
      justify-content: center;
      width: 100%;
      padding: 12px;
    }
    
    .review-card {
      padding: 12px;
      gap: 12px;
    }
    
    .reviewer-info {
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }
    
    .reviewer-name {
      font-size: 16px;
    }
    
    .review-text {
      font-size: 14px;
    }
    
    .review-date {
      font-size: 14px;
    }
    
    .review-actions {
      gap: 15px;
      justify-content: center;
    }
    
    .action-btn {
      font-size: 14px;
    }
    
    .company-response {
      padding: 12px 15px;
      margin-left: 0;
    }
    
    .response-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }
    
    .company-name {
      font-size: 16px;
    }
    
    .response-text {
      font-size: 14px;
    }
    
    .add-review-section {
      padding: 12px;
      gap: 20px;
    }
    
    .rating-title {
      font-size: 16px;
    }
    
    .rating-input {
      gap: 6px;
    }
    
    .star.clickable {
      width: 24px;
      height: 24px;
    }
    
    .review-textarea {
      padding: 12px;
      min-height: 70px;
      font-size: 14px;
    }
    
    .submit-btn {
      height: 44px;
      font-size: 14px;
    }
    
    .rating-summary {
      padding: 12px;
      gap: 20px;
    }
    
    .overall-rating {
      flex-direction: column;
      gap: 15px;
    }
    
    .main-score {
      font-size: 32px;
    }
    
    .rating-breakdown {
      gap: 4px;
    }
    
    .rating-row {
      gap: 10px;
    }
    
    .rating-number {
      width: 35px;
      font-size: 16px;
    }
    
    .rating-count {
      width: 25px;
      font-size: 14px;
    }
  }

  /* Small Mobile (375px and below) */
  @media screen and (max-width: 375px) {
    .reviews-container {
      padding: 0 5px;
    }
    
    .reviews-section {
      padding: 10px;
    }
    
    .review-card {
      padding: 10px;
    }
    
    .title {
      font-size: 18px;
    }
    
    .reviewer-name {
      font-size: 15px;
    }
    
    .review-text {
      font-size: 13px;
    }
    
    .add-review-section {
      padding: 10px;
    }
    
    .rating-title {
      font-size: 15px;
    }
    
    .review-textarea {
      padding: 10px;
      font-size: 13px;
    }
    
    .rating-summary {
      padding: 10px;
    }
    
    .main-score {
      font-size: 28px;
    }
  }

  /* Filter Panel Responsive */
  @media screen and (max-width: 767px) {
    .filter-panel {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 100vh;
      border-radius: 0;
      max-width: none;
    }
    
    .filter-content {
      padding: 15px;
    }
    
    .filter-section-title {
      font-size: 16px;
    }
    
    .filter-option {
      font-size: 14px;
    }
  }

  /* Touch Device Optimizations */
  @media (hover: none) and (pointer: coarse) {
    .filter-btn:hover, .website-btn:hover,
    .action-btn:hover, .star.clickable:hover,
    .submit-btn:hover {
      transform: none;
    }
    
    .action-btn, .filter-btn, .website-btn,
    .star.clickable, .submit-btn {
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }
  }

  /* High DPI Screens */
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    .review-card, .add-review-section, .rating-summary {
      box-shadow: 0 2px 8px rgba(158, 158, 158, 0.14);
    }
  }

  /* Print Styles */
  @media print {
    .reviews-container {
      width: 100%;
      margin-left: 0;
    }
    
    .filter-btn, .website-btn, .action-btn,
    .submit-btn, .filter-panel {
      display: none;
    }
    
    .review-card, .add-review-section, .rating-summary {
      box-shadow: none;
      border: 1px solid #ccc;
    }
  }
</style>