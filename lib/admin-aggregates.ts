// Calculates dashboard and analytics values from database-ready records.

import type { AnalyticsPoint, DashboardMetrics } from './types'

type BookingAggregate = { createdAt: Date; totalPrice: number }
type TourAggregate = { status: 'active' | 'draft'; createdAt: Date }

function monthKey(date: Date) {
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}`
}

function previousMonthKey(date: Date) {
  const previous = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() - 1, 1))
  return monthKey(previous)
}

export function formatTrend(current: number, previous: number) {
  if (previous === 0) return '—'
  const percent = Math.round(((current - previous) / previous) * 1000) / 10
  return `${percent >= 0 ? '+' : ''}${percent}%`
}

export function calculateInquiryConversion(bookings: { status: string }[]) {
  if (bookings.length === 0) return 0
  const confirmed = bookings.filter((booking) => booking.status === 'Баталгаажсан').length
  return Math.round((confirmed / bookings.length) * 100)
}

export function calculateDashboardMetrics(bookings: BookingAggregate[], tours: TourAggregate[], now = new Date()): DashboardMetrics {
  const currentMonth = monthKey(now)
  const previousMonth = previousMonthKey(now)
  const currentBookings = bookings.filter((booking) => monthKey(booking.createdAt) === currentMonth)
  const previousBookings = bookings.filter((booking) => monthKey(booking.createdAt) === previousMonth)
  const currentRevenue = currentBookings.reduce((sum, booking) => sum + booking.totalPrice, 0)
  const previousRevenue = previousBookings.reduce((sum, booking) => sum + booking.totalPrice, 0)
  const currentTours = tours.filter((tour) => monthKey(tour.createdAt) === currentMonth)

  return {
    totalBookings: bookings.length,
    monthlyBookings: currentBookings.length,
    revenue: bookings.reduce((sum, booking) => sum + booking.totalPrice, 0),
    activeTours: tours.filter((tour) => tour.status === 'active').length,
    bookingTrend: formatTrend(currentBookings.length, previousBookings.length),
    revenueTrend: formatTrend(currentRevenue, previousRevenue),
    tourTrend: currentTours.length === 0 ? '—' : `+${currentTours.length}`,
  }
}

export function buildInquiryGrowth(bookings: { createdAt: Date }[], now = new Date()): AnalyticsPoint[] {
  const months = Array.from({ length: 12 }, (_, index) => {
    const date = new Date(Date.UTC(now.getUTCFullYear(), index, 1))
    return { name: date.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' }), value: 0 }
  })
  for (const booking of bookings) {
    if (booking.createdAt.getUTCFullYear() === now.getUTCFullYear()) {
      months[booking.createdAt.getUTCMonth()].value += 1
    }
  }
  return months
}
