import HomeScreen from '../components/HomeScreen'
import { toDisplayTour } from '../lib/mappers'
import { prisma } from '../lib/db'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const rows = await prisma.tour.findMany({
    where: { featured: true, status: 'active' },
    orderBy: { createdAt: 'asc' },
  })
  const tours = rows.map(toDisplayTour)
  return <HomeScreen tours={tours} featuredTour={tours[0]} />
}