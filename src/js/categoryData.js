// src/js/categoryData.js
export const categoryData = [
  { 
    name: 'Animals & Pets', 
    icon: 'div',
    color: 'text-black',
    filters: {
      emergencyService: true,
      serviceTypes: {
        label: 'Type of service',
        options: [
          'Veterinary Clinic',
          'Pet Grooming', 
          'Pet Boarding',
          'Pet Training',
          'Pet Supplies Store'
        ]
      },
      specializations: {
        label: 'Animals treated',
        options: [
          'Dogs',
          'Cats', 
          'Bird',
          'Reptiles',
          'Small Mammals'
        ]
      }
    }
  },
  { 
    name: 'Beauty & Well-beings', 
    icon: 'div',
    color: 'text-black',
    filters: {
      emergencyService: false,
      serviceTypes: {
        label: 'Beauty Services',
        options: [
          'Hair Salon',
          'Spa & Massage', 
          'Skincare Clinic',
          'Nail Studio',
          'Wellness Center'
        ]
      },
      specializations: {
        label: 'Specializations',
        options: [
          'Hair Styling',
          'Facial Treatments', 
          'Body Massage',
          'Makeup Artistry',
          'Holistic Wellness'
        ]
      }
    }
  },
  { 
    name: 'Food & Beverage', 
    icon: 'div',
    color: 'text-black',
    filters: {
      emergencyService: false,
      serviceTypes: {
        label: 'Food Services',
        options: [
          'Restaurant',
          'Cafe & Bakery', 
          'Catering Service',
          'Food Truck',
          'Bar & Lounge'
        ]
      },
      specializations: {
        label: 'Cuisine Types',
        options: [
          'Italian',
          'Asian Fusion', 
          'Mexican',
          'Vegetarian',
          'Seafood'
        ]
      }
    }
  },
  { 
    name: 'Tourism & Hospitality', 
    icon: 'div',
    color: 'text-black',
    filters: {
      emergencyService: true,
      serviceTypes: {
        label: 'Tourism Services',
        options: [
          'Hotel & Resort',
          'Travel Agency', 
          'Tour Guide',
          'Adventure Tours',
          'Car Rental'
        ]
      },
      specializations: {
        label: 'Destinations',
        options: [
          'Beach Resorts',
          'Mountain Trekking', 
          'City Tours',
          'Cultural Heritage',
          'Adventure Sports'
        ]
      }
    }
  },
  { 
    name: 'IT & Software', 
    icon: 'div',
    color: 'text-black',
    filters: {
      emergencyService: false,
      serviceTypes: {
        label: 'IT Services',
        options: [
          'Software Development',
          'Web Development', 
          'Mobile App Development',
          'Cloud Services',
          'IT Consulting'
        ]
      },
      specializations: {
        label: 'Technologies',
        options: [
          'JavaScript',
          'Python', 
          'Java',
          'React',
          'Node.js'
        ]
      }
    }
  },
  { 
    name: 'More', 
    icon: 'div',
    color: 'text-black',
    filters: {
      emergencyService: false,
      serviceTypes: {
        label: 'Other Services',
        options: [
          'Consulting',
          'Education', 
          'Healthcare',
          'Real Estate',
          'Legal Services'
        ]
      },
      specializations: {
        label: 'Categories',
        options: [
          'Business',
          'Health', 
          'Education',
          'Property',
          'Legal'
        ]
      }
    }
  }
];

export const defaultCategoryData = {
  name: 'Default Category',
  icon: 'div',
  color: 'text-black',
  filters: {},
  listings: []
};

// Enhanced sample data with more filterable properties
export const allListings = [
  // Animals & Pets listings with enhanced data
  {
    id: 1,
    name: 'Steppe Spirit Tours',
    website: 'WWW.Nomadic.com',
    location: 'Lomas de Zamora',
    revenue: '$845k-1M',
    rating: 5,
    ratingCount: 359,
    comments: '4K',
    category: 'Animals & Pets',
    serviceType: 'Pet Training',
    specialization: 'Dogs',
    emergencyService: true,
    price: 200
  },
  {
    id: 2,
    name: 'Paws & Claws Clinic',
    website: 'WWW.PawsClaws.com',
    location: 'Buenos Aires',
    revenue: '$500k-750k',
    rating: 4,
    ratingCount: 287,
    comments: '2.8K',
    category: 'Animals & Pets',
    serviceType: 'Veterinary Clinic',
    specialization: 'Cats',
    emergencyService: true,
    price: 150
  },
  {
    id: 3,
    name: 'Pet Paradise Center',
    website: 'WWW.PetParadise.com',
    location: 'Córdoba',
    revenue: '$300k-500k',
    rating: 5,
    ratingCount: 451,
    comments: '5.2K',
    category: 'Animals & Pets',
    serviceType: 'Pet Boarding',
    specialization: 'Dogs',
    emergencyService: false,
    price: 100
  },
  {
    id: 4,
    name: 'Animal Care Plus',
    website: 'WWW.AnimalCare.com',
    location: 'Rosario',
    revenue: '$200k-300k',
    rating: 3,
    ratingCount: 198,
    comments: '1.5K',
    category: 'Animals & Pets',
    serviceType: 'Veterinary Clinic',
    specialization: 'Bird',
    emergencyService: true,
    price: 120
  },
  // Beauty & Well-beings listings
  {
    id: 5,
    name: 'Glamour Beauty Studio',
    website: 'WWW.GlamourBeauty.com',
    location: 'New York',
    revenue: '$350k-500k',
    rating: 4,
    ratingCount: 234,
    comments: '1.8K',
    category: 'Beauty & Well-beings',
    serviceType: 'Hair Salon',
    specialization: 'Hair Styling',
    emergencyService: false,
    price: 80
  },
  {
    id: 6,
    name: 'Serenity Spa & Wellness',
    website: 'WWW.SerenitySpa.com',
    location: 'Los Angeles',
    revenue: '$600k-800k',
    rating: 5,
    ratingCount: 389,
    comments: '3.2K',
    category: 'Beauty & Well-beings',
    serviceType: 'Spa & Massage',
    specialization: 'Body Massage',
    emergencyService: false,
    price: 120
  },
  {
    id: 7,
    name: 'Radiant Skin Clinic',
    website: 'WWW.RadiantSkin.com',
    location: 'Miami',
    revenue: '$450k-600k',
    rating: 4,
    ratingCount: 312,
    comments: '2.1K',
    category: 'Beauty & Well-beings',
    serviceType: 'Skincare Clinic',
    specialization: 'Facial Treatments',
    emergencyService: false,
    price: 90
  },
  // Food & Beverage listings
  {
    id: 8,
    name: 'Bella Italia Restaurant',
    website: 'WWW.BellaItalia.com',
    location: 'Chicago',
    revenue: '$1.2M-1.5M',
    rating: 4,
    ratingCount: 567,
    comments: '4.5K',
    category: 'Food & Beverage',
    serviceType: 'Restaurant',
    specialization: 'Italian',
    emergencyService: false,
    price: 60
  },
  {
    id: 9,
    name: 'Urban Brew Cafe',
    website: 'WWW.UrbanBrew.com',
    location: 'Seattle',
    revenue: '$400k-600k',
    rating: 5,
    ratingCount: 298,
    comments: '2.1K',
    category: 'Food & Beverage',
    serviceType: 'Cafe & Bakery',
    specialization: 'Vegetarian',
    emergencyService: false,
    price: 40
  },
  // Tourism & Hospitality listings
  {
    id: 10,
    name: 'Sunset Beach Resort',
    website: 'WWW.SunsetResort.com',
    location: 'Miami',
    revenue: '$2.5M-3M',
    rating: 5,
    ratingCount: 892,
    comments: '6.7K',
    category: 'Tourism & Hospitality',
    serviceType: 'Hotel & Resort',
    specialization: 'Beach Resorts',
    emergencyService: true,
    price: 300
  },
  {
    id: 11,
    name: 'Mountain Adventure Tours',
    website: 'WWW.MountainAdventure.com',
    location: 'Denver',
    revenue: '$800k-1.1M',
    rating: 4,
    ratingCount: 445,
    comments: '3.8K',
    category: 'Tourism & Hospitality',
    serviceType: 'Adventure Tours',
    specialization: 'Mountain Trekking',
    emergencyService: true,
    price: 180
  },
  // IT & Software listings
  {
    id: 12,
    name: 'Tech Solutions Inc.',
    website: 'WWW.TechSolutions.com',
    location: 'San Francisco',
    revenue: '$1.2M-1.5M',
    rating: 5,
    ratingCount: 287,
    comments: '1.2K',
    category: 'IT & Software',
    serviceType: 'Software Development',
    specialization: 'JavaScript',
    emergencyService: false,
    price: 150
  },
  {
    id: 13,
    name: 'CodeCraft Developers',
    website: 'WWW.CodeCraft.com',
    location: 'Austin',
    revenue: '$900k-1.2M',
    rating: 4,
    ratingCount: 156,
    comments: '890',
    category: 'IT & Software',
    serviceType: 'Web Development',
    specialization: 'React',
    emergencyService: false,
    price: 120
  },
  // More category listings
  {
    id: 14,
    name: 'Global Consulting Partners',
    website: 'WWW.GlobalConsult.com',
    location: 'Boston',
    revenue: '$1.8M-2.2M',
    rating: 4,
    ratingCount: 334,
    comments: '2.3K',
    category: 'More',
    serviceType: 'Consulting',
    specialization: 'Business',
    emergencyService: false,
    price: 200
  }
];