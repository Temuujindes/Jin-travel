import AdminDashboard from '../../components/admin/AdminDashboard'
import { toDisplayInquiry } from '../../lib/mappers'
import { calculateDashboardMetrics } from '../../lib/admin-aggregates'
import { prisma } from '../../lib/db'

export default async function DashboardPage() {
  const now = new Date()
  const monthStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1))
  const [totalBookings, monthlyBookings, revenueAggregate, activeTours, bookings, tours, inquiries] = await Promise.all([
    prisma.booking.count(),
    prisma.booking.count({ where: { createdAt: { gte: monthStart } } }),
    prisma.booking.aggregate({ _sum: { totalPrice: true } }),
    prisma.tour.count({ where: { status: 'active' } }),
    prisma.booking.findMany({ select: { createdAt: true, totalPrice: true } }),
    prisma.tour.findMany({ select: { status: true, createdAt: true } }),
    prisma.booking.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
      include: { tour: { select: { titleEn: true } } },
    }),
  ])
  const metrics = calculateDashboardMetrics(bookings, tours, now)
  return <AdminDashboard metrics={{ ...metrics, totalBookings, monthlyBookings, revenue: revenueAggregate._sum.totalPrice || 0, activeTours }} inquiries={inquiries.map(toDisplayInquiry)} />
}