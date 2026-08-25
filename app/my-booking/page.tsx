import MyBookingScreen from '../../components/MyBookingScreen'
import { toDisplayBooking, toDisplayTour } from '../../lib/mappers'
import { prisma } from '../../lib/db'

export default async function BookingPage() {
  const row = await prisma.booking.findFirst({
    orderBy: { createdAt: 'desc' },
    include: { tour: true },
  })
  if (!row) return <MyBookingScreen booking={null} tour={null} />
  return <MyBookingScreen booking={toDisplayBooking(row)} tour={toDisplayTour(row.tour)} />
}