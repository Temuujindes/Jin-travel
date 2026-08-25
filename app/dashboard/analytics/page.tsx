import AnalyticsScreen from '../../../components/admin/AnalyticsScreen'
import { buildInquiryGrowth, formatTrend } from '../../../lib/admin-aggregates'
import { prisma } from '../../../lib/db'

export const dynamic = 'force-dynamic'

export default async function AnalyticsPage() {
  const now = new Date()
  // Traffic remains mock data because no traffic source is stored in this phase.
  const grouped = await prisma.booking.groupBy({ by: ['tourId'], _count: { tourId: true } })
  const tours = await prisma.tour.findMany({ where: { id: { in: grouped.map((item) => item.tourId) } }, select: { id: true, titleEn: true } })
  const names = new Map(tours.map((tour) => [tour.id, tour.titleEn]))
  const popular = grouped
    .map((item) => ({ name: names.get(item.tourId) || item.tourId, value: item._count.tourId }))
    .sort((left, right) => right.value - left.value)
  const bookings = await prisma.booking.findMany({ select: { createdAt: true } })
  const growth = buildInquiryGrowth(bookings, now)
  const current = growth[now.getUTCMonth()].value
  const previous = growth[(now.getUTCMonth() + 11) % 12].value
  return <AnalyticsScreen popular={popular} growth={growth} growthTrend={formatTrend(current, previous)} />
}