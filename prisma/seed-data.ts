// Provides the real JIN Travel catalog used by the seed script and invariant tests.

import { Prisma } from '@prisma/client'

const images = {
  gobi: 'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?auto=format&fit=crop&w=1400&q=85',
  dunes: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1000&q=85',
  ger: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1000&q=85',
  steppe: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=1000&q=85',
  lake: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1000&q=85',
}

type SeedTour = {
  slug: string
  badge: string
  titleMn: string
  titleKr: string
  titleEn: string
  subtitleMn: string
  subtitleKr: string
  subtitleEn: string
  duration: string
  priceUsd: number
  priceMnt: string
  rating: number
  reviews: number
  tags: string[]
  mainImage: string
  gallery: string[]
  days: Prisma.ItineraryDayCreateWithoutTourInput[]
}

// The source localizes only tour-level titles, so MN/KR day fields reuse English source text.
const sourceDescription = (text: string) => ({
  descriptionMn: text,
  descriptionKr: text,
  descriptionEn: text,
})

const day = (
  title: string,
  route: string | null,
  meals: string[],
  accommodation: string,
  activities: string[],
  image: string,
): Prisma.ItineraryDayCreateWithoutTourInput => ({
  dayNumber: 0,
  titleMn: title,
  titleKr: title,
  titleEn: title,
  route,
  breakfast: meals.includes('Breakfast'),
  lunch: meals.includes('Lunch'),
  dinner: meals.includes('Dinner'),
  accommodation,
  activities,
  image,
  ...sourceDescription(activities.join('\n')),
})

export const seedTours: SeedTour[] = [
  {
    slug: 'gobi-4d',
    badge: 'Hot Deal',
    titleMn: 'Говь-4: Хонгорын элс тэвш аялал',
    titleKr: '고비 4일 익스프레스 & 낙타 트레킹',
    titleEn: '4-Day Gobi Express & Camel Trekking',
    subtitleMn: '사막, 낙타 트레킹, 별이 가득한 밤하늘을 한 번에',
    subtitleKr: '사막, 낙타 트레킹, 별이 가득한 밤하늘을 한 번에',
    subtitleEn: '사막, 낙타 트레킹, 별이 가득한 밤하늘을 한 번에',
    duration: '4 Days / 3 Nights',
    priceUsd: 580,
    priceMnt: '₮1,980,000',
    rating: 4.9,
    reviews: 128,
    tags: ['Ger Stay', 'Star-Gazing', '4x4 SUV', 'Camel Trekking'],
    mainImage: images.gobi,
    gallery: [images.gobi, images.dunes, images.ger, images.steppe],
    days: [
      day(
        'UB → Dalanzadgad → Yolyn Am (Vulture Valley)',
        '~45 km, ~1 hr',
        ['Lunch', 'Dinner'],
        'Ger camp near Gurvansaikhan National Park',
        [
          'Morning flight Ulaanbaatar → Dalanzadgad (~1.5 hrs)',
          'Met by local guide + driver, drive to Yolyn Am (~45 km, ~1 hr)',
          'Hike the narrow gorge in the Zuun Saikhan mountains — ice can remain on the gorge floor even in summer; watch for lammergeier (bearded vulture) overhead',
        ],
        images.steppe,
      ),
      day(
        'Yolyn Am → Khongoryn Els (Singing Sand Dunes)',
            '~180–200 km, ~4–5 hrs',
        ['Breakfast', 'Lunch', 'Dinner'],
        'Ger camp at Khongoryn Els',
        [
          'Drive to Khongoryn Els (~180–200 km, ~4–5 hrs across desert track)',
          'Afternoon camel trek along the dune base with a local herder',
          'Climb the dunes for sunset — Mongolia\'s tallest sand dunes (up to ~300m), known as "Duut Mankhan" (singing dunes) for the sound the wind makes across the sand',
        ],
        images.dunes,
      ),
      day(
        'Khongoryn Els → Bayanzag (Flaming Cliffs)',
        '~150–180 km',
        ['Breakfast', 'Lunch', 'Dinner'],
        'Ger camp near Bayanzag',
        [
          'Sunrise option: short dune climb before breakfast',
          'Drive to Bayanzag (~150–180 km)',
          'Visit the red sandstone cliffs where Roy Chapman Andrews\' 1923 American Museum expedition discovered the first scientifically documented dinosaur eggs',
          'Sunset at the cliffs — the erosion-carved red rock glows deep orange/red in late light, the source of the "Flaming Cliffs" name',
        ],
        images.gobi,
      ),
      day(
        'Bayanzag → Dalanzadgad → UB',
        '~100 km',
        ['Breakfast'],
        'N/A (departure day)',
        [
          'Morning drive to Dalanzadgad (~100 km)',
          'Afternoon flight back to Ulaanbaatar',
        ],
        images.steppe,
      ),
    ],
  },
  {
    slug: 'gobi-ultimate-6d',
    badge: 'Best Rated',
    titleMn: 'Говийн туйл ба Төв Монгол-6',
    titleKr: '6일 얼티밋 고비 & 중앙 몽골',
    titleEn: '6-Day Ultimate Gobi & Central Mongolia',
    subtitleMn: '고비와 초원의 가장 깊은 곳까지',
    subtitleKr: '고비와 초원의 가장 깊은 곳까지',
    subtitleEn: '고비와 초원의 가장 깊은 곳까지',
    duration: '6 Days / 5 Nights',
    priceUsd: 850,
    priceMnt: '₮2,900,000',
    rating: 4.9,
    reviews: 86,
    tags: ['Hot Spring', 'Nomadic Family', 'Ger Stay', '4x4 SUV'],
    mainImage: images.steppe,
    gallery: [images.steppe, images.gobi, images.dunes, images.ger],
    days: [
      day(
        'UB → Baga Gazriin Chuluu',
        '~240 km, ~4 hrs',
        ['Lunch', 'Dinner'],
        'Ger camp',
        [
          'Drive south (~240 km, ~4 hrs)',
          'Explore the granite rock formations, ancient inscriptions, and meditation caves at this sacred site',
        ],
        images.steppe,
      ),
      day(
        'Baga Gazriin Chuluu → Tsagaan Suvarga (White Stupa)',
        '~200 km',
        ['Breakfast', 'Lunch', 'Dinner'],
        'Ger camp',
        [
          'Drive to Tsagaan Suvarga in Dundgovi province (~200 km)',
          'Walk the rim of this large limestone escarpment, carved by wind and water into formations often compared to a Mars-like landscape',
        ],
        images.gobi,
      ),
      day(
        'Tsagaan Suvarga → Khongoryn Els',
        '~250–280 km',
        ['Breakfast', 'Lunch', 'Dinner'],
        'Ger camp at Khongoryn Els',
        [
          'Longer driving day into Umnugovi province (~250–280 km)',
          'Arrive at the Singing Sand Dunes in the afternoon, camel trek and dune climb at sunset',
        ],
        images.dunes,
      ),
      day(
        'Khongoryn Els → Yolyn Am → Bayanzag',
        '~180 km; ~100 km',
        ['Breakfast', 'Lunch', 'Dinner'],
        'Ger camp near Bayanzag',
        [
          'Morning drive to Yolyn Am (~180 km), hike the ice-floored gorge',
          'Continue to Bayanzag for sunset at the Flaming Cliffs (~100 km)',
        ],
        images.gobi,
      ),
      day(
        'Bayanzag → Karakorum / Khujirt Hot Spring',
        '~330 km',
        ['Breakfast', 'Lunch', 'Dinner'],
        'Ger camp with hot spring access',
        [
          'Long drive north toward central Mongolia (~330 km)',
          'Evening soak at Khujirt hot spring, Övörkhangai province — a natural mineral hot spring used by Mongolians for centuries',
        ],
        images.ger,
      ),
      day(
        'Karakorum → UB',
        '~370 km, ~5–6 hrs',
        ['Breakfast', 'Lunch'],
        'N/A (departure day)',
        [
          'Morning visit to Erdene Zuu Monastery, Mongolia\'s oldest Buddhist monastery, built on the site of the 13th-century Mongol Empire capital',
          'Drive back to Ulaanbaatar (~370 km, ~5–6 hrs)',
        ],
        images.steppe,
      ),
    ],
  },
  {
    slug: 'khuvsgul-3d',
    badge: 'Seasonal',
    titleMn: 'Хөвсгөл нуур-3 экспресс',
    titleKr: '3일 흡수골 호수 익스프레스',
    titleEn: '3-Day Khuvsgul Lake Express',
    subtitleMn: '몽골의 푸른 진주, 홉스골',
    subtitleKr: '몽골의 푸른 진주, 홉스골',
    subtitleEn: '몽골의 푸른 진주, 홉스골',
    duration: '3 Days / 2 Nights',
    priceUsd: 450,
    priceMnt: '₮1,530,000',
    rating: 4.8,
    reviews: 54,
    tags: ['Ger Stay', 'Lake', 'Horseback Riding'],
    mainImage: images.lake,
    gallery: [images.lake, images.ger, images.steppe],
    days: [
      day(
        'UB → Murun → Khuvsgul Lake',
        '~100 km, ~2–3 hrs, mostly paved',
        ['Lunch', 'Dinner'],
        'Ger camp on the lakeshore',
        [
          'Morning flight Ulaanbaatar → Murun (~1.5 hrs)',
          'Drive from Murun to the lake\'s southern shore at Khatgal (~100 km, ~2–3 hrs, mostly paved)',
          'Afternoon arrival, relax by "the dark blue pearl of Mongolia" — Asia\'s second-largest freshwater lake by volume, surrounded by taiga forest',
        ],
        images.lake,
      ),
      day(
        'Khuvsgul Lake — Horseback Riding & Taiga',
        null,
        ['Breakfast', 'Lunch', 'Dinner'],
        'Ger camp on the lakeshore',
        [
          'Full day horseback riding along the western shore with a local herder guide, through lakeside meadows and taiga forest',
          'Visit a local horse-herding family, try Mongolian dairy products',
          'Optional boat trip on the lake in the afternoon',
        ],
        images.ger,
      ),
      day(
        'Khuvsgul Lake → Murun → UB',
        '~100 km',
        ['Breakfast'],
        'N/A (departure day)',
        [
          'Morning free time by the lake (fishing, photography, or rest)',
          'Drive back to Murun (~100 km)',
          'Afternoon flight back to Ulaanbaatar',
        ],
        images.lake,
      ),
    ],
  },
]

export const addDayNumbers = (days: Prisma.ItineraryDayCreateWithoutTourInput[]) =>
  days.map((item, index) => ({ ...item, dayNumber: index + 1 }))
