import { ref, computed } from 'vue'

/**
 * Shared composable for admin page common functionality
 * Provides pagination, filtering, and search logic
 */
export function useAdminPage(dataRef, itemsPerPageValue = 10) {
  const currentPage = ref(1)
  const itemsPerPage = itemsPerPageValue
  const searchQuery = ref('')
  const showMobileFilters = ref(false)
  const filters = ref({
    dateFrom: '',
    dateTo: '',
    timeRange: '',
    status: '',
  })

  const handleFilterChange = () => {
    currentPage.value = 1
  }

  const resetFilters = (additionalFilters = {}) => {
    filters.value = {
      dateFrom: '',
      dateTo: '',
      timeRange: '',
      status: '',
      ...additionalFilters
    }
    handleFilterChange()
  }

  const applyMobileFilters = () => {
    handleFilterChange()
    showMobileFilters.value = false
  }

  const getDisplayIndex = (indexInPage) => {
    const trueIndex = (currentPage.value - 1) * itemsPerPage + indexInPage + 1
    return String(trueIndex).padStart(2, '0')
  }

  const getTotalPages = (filteredCount) => {
    return Math.max(1, Math.ceil(filteredCount / itemsPerPage))
  }

  const getPaginatedData = (filteredData) => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return filteredData.slice(start, end)
  }

  const nextPage = (totalPages) => {
    if (currentPage.value < totalPages) currentPage.value++
  }

  const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const applyDateFilter = (item, itemDateField = 'signupDate') => {
    const { dateFrom, dateTo } = filters.value
    if (!dateFrom && !dateTo) return true

    const itemDate = new Date(item[itemDateField])
    const fromDate = dateFrom ? new Date(dateFrom) : null
    const toDate = dateTo ? new Date(dateTo) : null

    if (fromDate && itemDate < fromDate) return false
    if (toDate && itemDate > toDate) return false
    return true
  }

  return {
    // State
    currentPage,
    itemsPerPage,
    searchQuery,
    showMobileFilters,
    filters,
    
    // Methods
    handleFilterChange,
    resetFilters,
    applyMobileFilters,
    getDisplayIndex,
    getTotalPages,
    getPaginatedData,
    nextPage,
    prevPage,
    formatDate,
    applyDateFilter,
  }
}
