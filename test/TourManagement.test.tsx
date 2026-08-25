import { fireEvent, screen } from '@testing-library/react'
import TourManagement from '../components/admin/TourManagement'
import { withProvider } from './helpers'

describe('TourManagement', () => {
  it('filters by title or slug case-insensitively and by status', () => {
    const { container } = withProvider(<TourManagement />)
    expect(container.querySelectorAll('.tour-admin-row')).toHaveLength(3)
    fireEvent.change(screen.getByRole('textbox', { name: '투어 검색...' }), { target: { value: 'GOBI-4D' } })
    expect(container.querySelectorAll('.tour-admin-row')).toHaveLength(1)
    fireEvent.click(screen.getByRole('button', { name: '활성' }))
    expect(container.querySelectorAll('.tour-admin-row')).toHaveLength(1)
    fireEvent.change(screen.getByRole('textbox', { name: '투어 검색...' }), { target: { value: '' } })
    fireEvent.click(screen.getByRole('button', { name: '초안' }))
    expect(container.querySelectorAll('.tour-admin-row')).toHaveLength(1)
  })

  it('switches between list and grid views', () => {
    const { container } = withProvider(<TourManagement />)
    const section = container.querySelector('.tour-management')!
    expect(section).not.toHaveClass('grid-view')
    fireEvent.click(screen.getByRole('button', { name: 'Grid view' }))
    expect(section).toHaveClass('grid-view')
    fireEvent.click(screen.getByRole('button', { name: 'List view' }))
    expect(section).not.toHaveClass('grid-view')
  })

  it('opens, cancels, and submits the create form with its real defaults', () => {
    const { container } = withProvider(<TourManagement />)
    fireEvent.click(screen.getByRole('button', { name: '새 투어 추가' }))
    expect(container.querySelector('.admin-dialog')).toBeInTheDocument()
    fireEvent.change(screen.getByRole('textbox', { name: /제목 MN/ }), { target: { value: 'New Desert Tour' } })
    fireEvent.change(screen.getByRole('textbox', { name: /설명/ }), { target: { value: 'A description' } })
    fireEvent.change(screen.getByRole('textbox', { name: /기간/ }), { target: { value: '2 Days' } })
    fireEvent.change(screen.getByRole('spinbutton', { name: /USD 가격/ }), { target: { value: '333' } })
    fireEvent.click(screen.getByRole('button', { name: '저장' }))
    expect(screen.getByText('New Desert Tour')).toBeInTheDocument()
    expect(screen.getByText('new-desert-tour')).toBeInTheDocument()
    expect(screen.getByText('$333')).toBeInTheDocument()
    expect(container.querySelector('.admin-tour-status.draft')).toHaveTextContent('초안')
    expect(container.querySelector('.admin-dialog')).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: '새 투어 추가' }))
    fireEvent.click(screen.getAllByRole('button', { name: '취소' }).at(-1)!)
    expect(container.querySelector('.admin-dialog')).not.toBeInTheDocument()
  })
})
