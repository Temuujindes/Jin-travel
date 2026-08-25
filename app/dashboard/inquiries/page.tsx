import InquiriesScreen from '../../../components/admin/InquiriesScreen'
import { toDisplayInquiry } from '../../../lib/mappers'
import { prisma } from '../../../lib/db'

export default async function InquiriesPage() {
  const inquiries = await prisma.booking.findMany({
    orderBy: { createdAt: 'desc' },
    include: { tour: { select: { titleEn: true } } },
  })
  return <InquiriesScreen inquiries={inquiries.map(toDisplayInquiry)} />
}
