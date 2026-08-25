import { fireEvent, screen } from '@testing-library/react'
import BookingFlow from '../components/BookingFlow'
import { withProvider } from './helpers'

describe('BookingFlow', () => {
  it('changes traveler count, clamps at one, and calculates total', () => {
    withProvider(<BookingFlow />)
    expect(screen.getByText('$1160')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Add traveler' }))
    expect(screen.getByText('$1740')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Remove traveler' }))
    fireEvent.click(screen.getByRole('button', { name: 'Remove traveler' }))
    fireEvent.click(screen.getByRole('button', { name: 'Remove traveler' }))
    expect(screen.getByText('$580')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Remove traveler' })).toBeInTheDocument()
  })

  it('validates details before completing and shows the reference on success', () => {
    withProvider(<BookingFlow />)
    fireEvent.click(screen.getByRole('button', { name: '계속하기' }))
    expect(screen.getByRole('heading', { name: '고객 정보' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: '문의 보내기' }))
    expect(document.querySelector('.error')).toHaveTextContent('고객 이름')
    expect(screen.getByRole('heading', { name: '고객 정보' })).toBeInTheDocument()
    fireEvent.change(screen.getByLabelText('고객 이름'), { target: { value: 'Ada' } })
    fireEvent.change(screen.getByLabelText('카카오톡 ID / 전화번호'), { target: { value: '@ada' } })
    fireEvent.click(screen.getByRole('button', { name: '문의 보내기' }))
    expect(screen.getByRole('heading', { name: '예약 문의가 완료되었습니다!' })).toBeInTheDocument()
    expect(screen.getByText('JIN-2026-08421')).toBeInTheDocument()
  })
})
