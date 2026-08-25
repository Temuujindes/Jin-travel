import { fireEvent, screen, waitFor } from '@testing-library/react'
import { beforeEach, vi } from 'vitest'
import BookingFlow from '../components/BookingFlow'
import { createBooking } from '../app/actions/bookings'
import { fixtureTour } from './fixtures'
import { withProvider } from './helpers'

vi.mock('../app/actions/bookings', () => ({ createBooking: vi.fn() }))

describe('BookingFlow', () => {
  beforeEach(() => {
    vi.mocked(createBooking).mockResolvedValue({ success: true, referenceCode: 'JIN-2026-12345' })
  })

  it('changes traveler count, clamps at one, and calculates total', () => {
    withProvider(<BookingFlow tour={fixtureTour} />)
    expect(screen.getByText('$1160')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Add traveler' }))
    expect(screen.getByText('$1740')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Remove traveler' }))
    fireEvent.click(screen.getByRole('button', { name: 'Remove traveler' }))
    fireEvent.click(screen.getByRole('button', { name: 'Remove traveler' }))
    expect(screen.getByText('$580')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Remove traveler' })).toBeInTheDocument()
  })

  it('validates details before completing and shows the reference on success', async () => {
    withProvider(<BookingFlow tour={fixtureTour} />)
    fireEvent.change(screen.getByLabelText('출발일'), { target: { value: '2026-10-01' } })
    fireEvent.click(screen.getByRole('button', { name: '계속하기' }))
    expect(screen.getByRole('heading', { name: '고객 정보' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: '문의 보내기' }))
    expect(document.querySelector('.error')).toHaveTextContent('고객 이름')
    expect(screen.getByRole('heading', { name: '고객 정보' })).toBeInTheDocument()
    fireEvent.change(screen.getByLabelText('고객 이름'), { target: { value: 'Ada' } })
    fireEvent.change(screen.getByLabelText('카카오톡 ID / 전화번호'), { target: { value: '@ada' } })
    fireEvent.change(screen.getByLabelText(/특별 요청/), { target: { value: 'Window seat' } })
    fireEvent.click(screen.getByRole('button', { name: '문의 보내기' }))
    await waitFor(() => expect(screen.getByRole('heading', { name: '예약 문의가 완료되었습니다!' })).toBeInTheDocument())
    expect(screen.getByText('JIN-2026-12345')).toBeInTheDocument()
    expect(createBooking).toHaveBeenCalledWith({
      tourId: fixtureTour.id,
      customerName: 'Ada',
      contact: '@ada',
      startDate: '2026-10-01',
      travelers: 2,
      specialRequest: 'Window seat',
    })
  })
})
