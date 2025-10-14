// Simple utility functions only
export const getStatusClass = (type) => {
    const statusClasses = {
      service: 'bg-blue-100 text-blue-800 border-blue-200',
      specialization: 'bg-green-100 text-green-800 border-green-200',
      emergency: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      rating: 'bg-purple-100 text-purple-800 border-purple-200',
      price: 'bg-orange-100 text-orange-800 border-orange-200'
    };
    return statusClasses[type] || 'bg-gray-100 text-gray-800 border-gray-200';
  };