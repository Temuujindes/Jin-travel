import { reducer } from '../components/admin/ItineraryBuilder'
import { fixtureTour } from './fixtures'

const makeTour = () => ({
  ...fixtureTour,
  itinerary: [...fixtureTour.itinerary, ...fixtureTour.itinerary, ...fixtureTour.itinerary, ...fixtureTour.itinerary].map((day, index) => ({
    ...day,
    day: index + 1,
    meals: [...day.meals],
    activities: [...day.activities],
    descriptions: { mn: 'mn', kr: 'kr', en: 'en' },
  })),
})

describe('ItineraryBuilder reducer', () => {
  it('updates a tour field immutably', () => {
    const tour = makeTour()
    const result = reducer(tour, { type: 'tour', field: 'title', value: 'Updated' })
    expect(result.title).toBe('Updated')
    expect(tour.title).toBe(fixtureTour.title)
    expect(result).not.toBe(tour)
  })

  it('updates only the targeted day field', () => {
    const tour = makeTour()
    const result = reducer(tour, { type: 'day', index: 1, field: 'title', value: 'Day changed' })
    expect(result.itinerary[1].title).toBe('Day changed')
    expect(result.itinerary[0]).toEqual(tour.itinerary[0])
    expect(result.itinerary).not.toBe(tour.itinerary)
  })

  it('merges one language description without dropping other languages', () => {
    const tour = makeTour()
    const result = reducer(tour, { type: 'description', index: 0, language: 'kr', value: '새 설명' })
    expect(result.itinerary[0].descriptions).toEqual({ mn: 'mn', kr: '새 설명', en: 'en' })
    expect(tour.itinerary[0].descriptions).toEqual({ mn: 'mn', kr: 'kr', en: 'en' })
  })

  it('toggles meals on and off', () => {
    const tour = makeTour()
    const added = reducer(tour, { type: 'meal', index: 0, meal: 'Breakfast' })
    expect(added.itinerary[0].meals).toContain('Breakfast')
    const removed = reducer(added, { type: 'meal', index: 0, meal: 'Breakfast' })
    expect(removed.itinerary[0].meals).not.toContain('Breakfast')
    expect(tour.itinerary[0].meals).not.toContain('Breakfast')
  })

  it('appends a blank sequential day', () => {
    const tour = makeTour()
    const result = reducer(tour, { type: 'add' })
    const day = result.itinerary.at(-1)!
    expect(day.day).toBe(tour.itinerary.length + 1)
    expect(day.meals).toEqual([])
    expect(day.activities).toEqual([])
    expect(day.descriptions).toEqual({ mn: '', kr: '', en: '' })
    expect(tour.itinerary).toHaveLength(4)
  })

  it('removes a day and renumbers remaining days', () => {
    const tour = makeTour()
    const result = reducer(tour, { type: 'remove', index: 1 })
    expect(result.itinerary.map((day) => day.day)).toEqual([1, 2, 3])
    expect(result.itinerary.map((day) => day.title)).toEqual([
      tour.itinerary[0].title,
      tour.itinerary[2].title,
      tour.itinerary[3].title,
    ])
    expect(tour.itinerary).toHaveLength(4)
  })

  it('sets and clears a day image', () => {
    const tour = makeTour()
    const set = reducer(tour, { type: 'image', index: 0, value: 'new-image' })
    expect(set.itinerary[0].image).toBe('new-image')
    const cleared = reducer(set, { type: 'image', index: 0, value: '' })
    expect(cleared.itinerary[0].image).toBe('')
    expect(tour.itinerary[0].image).not.toBe('')
  })
})
