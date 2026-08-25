import { fireEvent, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import TourManagement from '../components/admin/TourManagement'
import { createTour, setTourStatus } from '../app/actions/tours'
import { withProvider } from './helpers'
import { fixtureTour } from './fixtures'

const tours = [fixtureTour, { ...fixtureTour, id: 'tour-2', slug: 'gobi-ultimate-6d', title: 'Ultimate Gobi', status: 'active' as const }, { ...fixtureTour, id: 'tour-3', slug: 'khuvsgul-3d', title: 'Khuvsgul', status: 'draft' as const }]

vi.mock('../app/actions/tours', () => ({
  createTour: vi.fn().mockResolvedValue({ success: true, tourId: 'new-tour' }),
  setTourStatus: vi.fn().mockResolvedValue({ success: true }),
}))

describe('TourManagement', () => {
  it('filters by title or slug case-insensitively and by status', () => {
    const { container } = withProvider(<TourManagement initialTours={tours} />)
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
    const { container } = withProvider(<TourManagement initialTours={tours} />)
    const section = container.querySelector('.tour-management')!
    expect(section).not.toHaveClass('grid-view')
    fireEvent.click(screen.getByRole('button', { name: 'Grid view' }))
    expect(section).toHaveClass('grid-view')
    fireEvent.click(screen.getByRole('button', { name: 'List view' }))
    expect(section).not.toHaveClass('grid-view')
  })

  it('opens, cancels, and submits the create form with its real defaults', async () => {
    const { container } = withProvider(<TourManagement initialTours={tours} />)
    fireEvent.click(screen.getByRole('button', { name: '새 투어 추가' }))
    expect(container.querySelector('.admin-dialog')).toBeInTheDocument()
    fireEvent.change(screen.getByRole('textbox', { name: /제목 MN/ }), { target: { value: 'New Desert Tour' } })
    fireEvent.change(screen.getByRole('textbox', { name: /설명/ }), { target: { value: 'A description' } })
    fireEvent.change(screen.getByRole('textbox', { name: /기간/ }), { target: { value: '2 Days' } })
    fireEvent.change(screen.getByRole('spinbutton', { name: /USD 가격/ }), { target: { value: '333' } })
    fireEvent.click(screen.getByRole('button', { name: '저장' }))
    await waitFor(() => expect(screen.getByText('New Desert Tour')).toBeInTheDocument())
    expect(screen.getByText('New Desert Tour')).toBeInTheDocument()
    expect(screen.getByText('new-desert-tour')).toBeInTheDocument()
    expect(screen.getByText('$333')).toBeInTheDocument()
    expect(container.querySelector('.admin-tour-status.draft')).toHaveTextContent('초안')
    expect(container.querySelector('.admin-dialog')).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: '새 투어 추가' }))
    fireEvent.click(screen.getAllByRole('button', { name: '취소' }).at(-1)!)
    expect(container.querySelector('.admin-dialog')).not.toBeInTheDocument()
  })

  it('uses create-form defaults when optional fields are blank', async () => {
    const { container } = withProvider(<TourManagement initialTours={tours} />)
    fireEvent.click(screen.getByRole('button', { name: '새 투어 추가' }))
    fireEvent.change(screen.getByRole('textbox', { name: /제목 MN/ }), { target: { value: 'Defaults Tour' } })
    fireEvent.change(screen.getByRole('spinbutton', { name: /USD 가격/ }), { target: { value: '' } })
    fireEvent.click(container.querySelector('.dialog-heading button')!)
    expect(container.querySelector('.admin-dialog')).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: '새 투어 추가' }))
    fireEvent.change(screen.getByRole('textbox', { name: /제목 MN/ }), { target: { value: 'Defaults Tour' } })
    fireEvent.click(screen.getByRole('button', { name: '저장' }))
    await waitFor(() => expect(screen.getByText('Defaults Tour')).toBeInTheDocument())
    expect(container.querySelectorAll('.tour-admin-row')).toHaveLength(4)
    fireEvent.click(screen.getByRole('button', { name: '전체' }))
    expect(container.querySelectorAll('.tour-admin-row')).toHaveLength(4)
  })

  it('toggles active and draft status from each row action', async () => {
    const { container } = withProvider(<TourManagement initialTours={tours} />)
    fireEvent.click(screen.getAllByRole('button', { name: '초안으로 변경' })[0])
    await waitFor(() => expect(container.querySelectorAll('.admin-tour-status.draft')).toHaveLength(2))
    fireEvent.click(screen.getAllByRole('button', { name: '게시' })[0])
    await waitFor(() => expect(container.querySelectorAll('.admin-tour-status.active')).toHaveLength(2))
    fireEvent.click(screen.getAllByRole('button', { name: '게시' })[0])
    await waitFor(() => expect(container.querySelectorAll('.admin-tour-status.active')).toHaveLength(3))
  })

  it('leaves existing UI unchanged when actions fail or a tour has no ID', async () => {
    vi.mocked(createTour).mockClear()
    vi.mocked(setTourStatus).mockClear()
    vi.mocked(createTour).mockResolvedValueOnce({ success: false, code: 'createFailed' })
    const first = withProvider(<TourManagement initialTours={tours} />)
    const { container } = first
    fireEvent.click(screen.getByRole('button', { name: '새 투어 추가' }))
    fireEvent.change(screen.getByRole('textbox', { name: /제목 MN/ }), { target: { value: 'Failed Tour' } })
    fireEvent.click(screen.getByRole('button', { name: '저장' }))
    await waitFor(() => expect(container.querySelector('.admin-dialog')).toBeInTheDocument())
    vi.mocked(setTourStatus).mockResolvedValueOnce({ success: false, code: 'statusUpdateFailed' })
    fireEvent.click(screen.getAllByRole('button', { name: '초안으로 변경' })[0])
    await waitFor(() => expect(container.querySelectorAll('.admin-tour-status.draft')).toHaveLength(1))
    first.unmount()
    const noIdTour = { ...fixtureTour, id: undefined }
    const second = withProvider(<TourManagement initialTours={[noIdTour]} />)
    fireEvent.click(screen.getByRole('button', { name: '초안으로 변경' }))
    expect(setTourStatus).toHaveBeenCalledTimes(1)
    second.unmount()
  })
})
