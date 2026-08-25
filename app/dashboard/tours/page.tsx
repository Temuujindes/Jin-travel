import TourManagement from '../../../components/admin/TourManagement'
import { toDisplayTour } from '../../../lib/mappers'
import { prisma } from '../../../lib/db'

export const dynamic = 'force-dynamic'

export default async function ToursDashboardPage() {
  const tours = await prisma.tour.findMany({ orderBy: { createdAt: 'asc' }, include: { itineraryDays: { orderBy: { dayNumber: 'asc' } } } })
  return <TourManagement initialTours={tours.map(toDisplayTour)} />
}