// Seeds the real JIN Travel catalog and one local admin user.

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { addDayNumbers, seedTours } from './seed-data'

const prisma = new PrismaClient()

async function main() {
  for (const tour of seedTours) {
    await prisma.tour.upsert({
      where: { slug: tour.slug },
      create: {
        slug: tour.slug,
        badge: tour.badge,
        titleMn: tour.titleMn,
        titleKr: tour.titleKr,
        titleEn: tour.titleEn,
        subtitleMn: tour.subtitleMn,
        subtitleKr: tour.subtitleKr,
        subtitleEn: tour.subtitleEn,
        duration: tour.duration,
        priceUsd: tour.priceUsd,
        priceMnt: tour.priceMnt,
        rating: tour.rating,
        reviews: tour.reviews,
        tags: tour.tags,
        mainImage: tour.mainImage,
        gallery: tour.gallery,
        status: 'active',
        featured: true,
        itineraryDays: { create: addDayNumbers(tour.days) },
      },
      update: {
        badge: tour.badge,
        titleMn: tour.titleMn,
        titleKr: tour.titleKr,
        titleEn: tour.titleEn,
        subtitleMn: tour.subtitleMn,
        subtitleKr: tour.subtitleKr,
        subtitleEn: tour.subtitleEn,
        duration: tour.duration,
        priceUsd: tour.priceUsd,
        priceMnt: tour.priceMnt,
        rating: tour.rating,
        reviews: tour.reviews,
        tags: tour.tags,
        mainImage: tour.mainImage,
        gallery: tour.gallery,
        status: 'active',
        featured: true,
        itineraryDays: {
          deleteMany: {},
          create: addDayNumbers(tour.days),
        },
      },
    })
  }

  // Local development defaults are intentionally non-production credentials and can be overridden with SEED_ADMIN_*.
  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? 'admin@jintravel.local'
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? 'jintravel-local-only'
  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    create: {
      email: adminEmail,
      hashedPassword: await bcrypt.hash(adminPassword, 10),
      name: 'JIN Travel Admin',
    },
    update: {
      name: 'JIN Travel Admin',
      hashedPassword: await bcrypt.hash(adminPassword, 10),
    },
  })
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
