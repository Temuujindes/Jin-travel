import TourDetailScreen from '../../../components/TourDetailScreen'
import { toDisplayTour } from '../../../lib/mappers'
import { prisma } from '../../../lib/db'
import { notFound } from 'next/navigation'

export default async function TourPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	const row = await prisma.tour.findUnique({
		where: { slug },
		include: { itineraryDays: { orderBy: { dayNumber: 'asc' } } },
	})
	if (!row) notFound()
	return <TourDetailScreen tour={toDisplayTour(row)} />
}