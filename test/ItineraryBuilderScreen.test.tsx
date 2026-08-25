import { fireEvent, screen, waitFor } from '@testing-library/react'
import { afterEach, vi } from 'vitest'
import ItineraryBuilder from '../components/admin/ItineraryBuilder'
import { saveItinerary } from '../app/actions/itinerary'
import { withProvider } from './helpers'
import { fixtureTour } from './fixtures'

vi.mock('../app/actions/itinerary', () => ({
  saveItinerary: vi.fn().mockResolvedValue({ success: true }),
}))

afterEach(() => {
  vi.restoreAllMocks()
  delete (URL as unknown as { createObjectURL?: unknown }).createObjectURL
})

describe('ItineraryBuilder screen', () => {
  it('edits builder fields, uploads an image, and removes a day', async () => {
    const createObjectURL = vi.fn().mockReturnValue('blob:image')
    Object.defineProperty(URL, 'createObjectURL', {
      configurable: true,
      value: createObjectURL,
    })
    const { container } = withProvider(<ItineraryBuilder initialTour={fixtureTour} />)
    const editorPanel = container.querySelector('.editor-panel')!
    const generalFields = editorPanel.querySelectorAll('input, textarea')
    fireEvent.change(generalFields[0], { target: { value: 'Updated tour' } })
    fireEvent.change(generalFields[1], { target: { value: 'Updated subtitle' } })
    fireEvent.change(generalFields[2], { target: { value: '5 Days' } })
    fireEvent.change(generalFields[3], { target: { value: '700' } })
    fireEvent.click(screen.getByRole('button', { name: '저장' }))
    await waitFor(() => expect(screen.getByRole('button', { name: '저장됨' })).toBeInTheDocument())

    const firstDay = container.querySelector('.day-editor')!
    const dayInputs = firstDay.querySelectorAll('input')
    fireEvent.change(dayInputs[0], { target: { value: 'Updated day' } })
    fireEvent.change(dayInputs[1], { target: { value: '10km' } })
    fireEvent.change(firstDay.querySelector('select')!, { target: { value: 'Зочид буудал' } })
    fireEvent.click(firstDay.querySelector('input[type="checkbox"]')!)

    const file = new File(['image'], 'day.jpg', { type: 'image/jpeg' })
    const fileInput = container.querySelector('input[type="file"]')!
    fireEvent.change(fileInput, { target: { files: [file] } })
    expect(createObjectURL).toHaveBeenCalledWith(file)
    fireEvent.change(fileInput, { target: { files: [] } })
    fireEvent.click(screen.getAllByRole('button', { name: '취소' })[0])

    const initialDayCount = container.querySelectorAll('.day-editor').length
    fireEvent.click(screen.getByRole('button', { name: '일정 추가' }))
    expect(container.querySelectorAll('.day-editor')).toHaveLength(initialDayCount + 1)
    fireEvent.click(screen.getAllByRole('button', { name: 'EN' })[1])
    const description = container.querySelectorAll('.day-editor textarea')[0]
    fireEvent.change(description, { target: { value: 'Updated details' } })
    expect(description).toHaveValue('Updated details')
    fireEvent.click(screen.getAllByRole('button', { name: 'Delete day' })[0])
    expect(container.querySelectorAll('.day-editor')).toHaveLength(initialDayCount)
    createObjectURL.mockRestore()
  })

  it('does not show saved state when persistence fails', async () => {
    vi.mocked(saveItinerary).mockResolvedValueOnce({ success: false, code: 'saveFailed' })
    withProvider(<ItineraryBuilder initialTour={fixtureTour} />)
    fireEvent.click(screen.getByRole('button', { name: '저장' }))
    await waitFor(() => expect(screen.getByRole('button', { name: '저장' })).toBeInTheDocument())
  })
})
