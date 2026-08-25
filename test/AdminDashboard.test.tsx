import { screen } from '@testing-library/react'
import { InquiryTable } from '../components/admin/AdminDashboard'
import type { Inquiry } from '../lib/types'
import { withProvider } from './helpers'
import { seedInquiries as inquiries } from './fixtures'

describe('InquiryTable', () => {
  it('renders every inquiry, initials, and status classes', () => {
    const { container } = withProvider(<InquiryTable inquiries={inquiries as Inquiry[]} />)
    inquiries.forEach((inquiry) => {
      expect(screen.getByText(inquiry.customer)).toBeInTheDocument()
      expect(screen.getByText(inquiry.customer.split(' ').map((part) => part[0]).join(''))).toBeInTheDocument()
    })
    expect(container.querySelector('.inquiry-status.new')).toHaveTextContent('Шинэ')
    expect(container.querySelector('.inquiry-status.contacted')).toHaveTextContent('Холбогдсон')
    expect(container.querySelector('.inquiry-status.confirmed')).toHaveTextContent('Баталгаажсан')
    expect(container.querySelectorAll('.inquiry-row')).toHaveLength(inquiries.length + 1)
  })
})
