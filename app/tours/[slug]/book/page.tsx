// Loads a real tour before rendering its guest booking form.

import { notFound } from 'next/navigation'
import BookingFlow from '../../../../components/BookingFlow'
import { toDisplayTour } from '../../../../lib/mappers'
import { prisma } from '../../../../lib/db'

export default async function BookingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const row = await prisma.tour.findUnique({ where: { slug } })
  if (!row) notFound()
  return <BookingFlow tour={toDisplayTour(row)} />
}
