import { Tour } from '../types'

const image = {
  gobi: 'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?auto=format&fit=crop&w=1400&q=85',
  dunes: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1000&q=85',
  ger: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1000&q=85',
  steppe: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=1000&q=85',
  lake: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1000&q=85',
}

export const tours: Tour[] = [
  { slug: 'gobi-4d', badge: 'Hot Deal', title: '4-Day Gobi Express & Camel Trekking', subtitle: '사막, 낙타 트레킹, 별이 가득한 밤하늘을 한 번에', duration: '4 Days 3 Nights', priceUsd: 580, priceMnt: '₮1,980,000', rating: 4.9, reviews: 128, tags: ['Ger Stay', 'Star-Gazing', '4x4 SUV'], image: image.gobi, gallery: [image.gobi, image.dunes, image.ger, image.steppe], itinerary: [
    { day: 1, title: 'UB → Baga Gazriin Chuluu', distance: '240km · 4 hrs', meals: ['Lunch', 'Dinner'], accommodation: 'Ger Stay', activities: ['Baga Gazriin Chuluu'], image: image.steppe },
    { day: 2, title: 'Khongor Sand Dunes', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Ger Camp', activities: ['Camel Trekking', 'Sunset', 'Sand Dunes'], image: image.dunes },
    { day: 3, title: 'Bayanzag Flaming Cliffs', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Ger Camp', activities: ['Dinosaur Fossils', 'Desert Exploration', 'Sunset'], image: image.gobi },
    { day: 4, title: 'Yol Valley Ice Canyon → UB', meals: ['Breakfast', 'Lunch'], accommodation: '—', activities: ['Yol Valley', 'Ice Canyon', 'Return to Ulaanbaatar'], image: image.steppe },
  ] },
  { slug: 'central-6d', badge: 'Best Rated', title: '6-Day Ultimate Gobi & Central Mongolia', subtitle: '고비와 초원의 가장 깊은 곳까지', duration: '6 Days 5 Nights', priceUsd: 850, priceMnt: '₮2,900,000', rating: 4.9, reviews: 86, tags: ['Hot Spring', 'Nomadic Family'], image: image.steppe, gallery: [image.steppe], itinerary: [] },
  { slug: 'khuvsgul-3d', badge: 'Seasonal', title: '3-Day Khuvsgul Lake Express', subtitle: '몽골의 푸른 진주, 홉스골', duration: '3 Days 2 Nights', priceUsd: 450, priceMnt: '₮1,530,000', rating: 4.8, reviews: 54, tags: ['Lake', 'Taiga'], image: image.lake, gallery: [image.lake], itinerary: [] },
]

export const featuredTour = tours[0]