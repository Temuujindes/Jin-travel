import TourDetailScreen from '../../../components/TourDetailScreen'

export default async function TourPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	return <TourDetailScreen slug={slug} />
}