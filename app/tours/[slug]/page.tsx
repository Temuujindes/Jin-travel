import { notFound } from 'next/navigation'
import TourDetailScreen from '../../../components/TourDetailScreen'
import { tours } from '../../../lib/mock-data/tours'

export default async function TourPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	if (!tours.some((tour) => tour.slug === slug)) notFound()
	return <TourDetailScreen slug={slug} />
}