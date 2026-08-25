import ToursScreen from '../../components/ToursScreen'
import { toDisplayTour } from '../../lib/mappers'
import { prisma } from '../../lib/db'

export const dynamic = 'force-dynamic'

export default async function ToursPage() {
  const rows = await prisma.tour.findMany({
    where: { status: 'active' },
    orderBy: { createdAt: 'asc' },
  })
  return <ToursScreen tours={rows.map(toDisplayTour)} />
}