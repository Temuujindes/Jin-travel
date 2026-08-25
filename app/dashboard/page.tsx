import AdminDashboard from '../../components/admin/AdminDashboard'
import { toDisplayInquiry } from '../../lib/mappers'
import { calculateDashboardMetrics, calculateInquiryConversion } from '../../lib/admin-aggregates'
import { prisma } from '../../lib/db'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const now = new Date()
  const [bookings, tours, inquiries] = await Promise.all([
    prisma.booking.findMany({ select: { createdAt: true, totalPrice: true, status: true } }),
    prisma.tour.findMany({ select: { status: true, createdAt: true } }),
    prisma.booking.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
      include: { tour: { select: { titleEn: true } } },
    }),
  ])
  const metrics = calculateDashboardMetrics(bookings, tours, now)
  return <AdminDashboard metrics={metrics} inquiryConversion={calculateInquiryConversion(bookings)} inquiries={inquiries.map(toDisplayInquiry)} />
}