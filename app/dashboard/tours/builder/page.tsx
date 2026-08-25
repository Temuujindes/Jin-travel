import ItineraryBuilder from '../../../../components/admin/ItineraryBuilder'
import { toDisplayTour } from '../../../../lib/mappers'
import { prisma } from '../../../../lib/db'

export default async function BuilderPage({ searchParams }: { searchParams: Promise<{ tour?: string }> }) {
  const { tour: slug } = await searchParams
  const row = slug
    ? await prisma.tour.findUnique({ where: { slug }, include: { itineraryDays: { orderBy: { dayNumber: 'asc' } } } })
    : await prisma.tour.findFirst({ orderBy: { createdAt: 'asc' }, include: { itineraryDays: { orderBy: { dayNumber: 'asc' } } } })
  const initialTour = row
    ? toDisplayTour(row)
    : {
        id: '',
        slug: '',
        badge: '',
        title: '',
        subtitle: '',
        duration: '',
        priceUsd: 0,
        priceMnt: '',
        rating: 0,
        reviews: 0,
        tags: [],
        image: '',
        gallery: [],
        itinerary: [],
      }
  return <ItineraryBuilder initialTour={initialTour} />
}