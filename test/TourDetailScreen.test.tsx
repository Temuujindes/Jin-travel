import { fireEvent, screen } from '@testing-library/react'
import TourDetailScreen from '../components/TourDetailScreen'
import { withProvider } from './helpers'

describe('TourDetailScreen', () => {
  it('resolves a slug and falls back to the first tour', () => {
    const { unmount } = withProvider(<TourDetailScreen slug="gobi-4d" />)
    expect(screen.getByRole('heading', { name: '고비 익스프레스 & 낙타 트레킹' })).toBeInTheDocument()
    unmount()
    withProvider(<TourDetailScreen slug="unknown" />)
    expect(screen.getByRole('heading', { name: '고비 익스프레스 & 낙타 트레킹' })).toBeInTheDocument()
  })

  it('uses an override and updates gallery and accordion state', () => {
    const override = {
      slug: 'override',
      title: 'Override',
      subtitle: 'Override subtitle',
      localizedTitle: { kr: '오버라이드' },
      badge: 'Test',
      duration: '1 day',
      priceUsd: 1,
      priceMnt: '₮1',
      rating: 5,
      reviews: 1,
      tags: [],
      image: 'hero',
      gallery: ['hero', 'second'],
      itinerary: [{ day: 1, title: 'First day', meals: [], accommodation: 'Tent', activities: [], image: 'day', descriptions: { kr: 'Details' } }],
    }
    withProvider(<TourDetailScreen tourOverride={override} />)
    expect(screen.getByRole('heading', { name: '오버라이드' })).toBeInTheDocument()
    expect(screen.getByText('1 / 2')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: '갤러리 2' }))
    expect(screen.getByText('2 / 2')).toBeInTheDocument()
    const day = screen.getByRole('button', { name: /First day/ })
    expect(day).toHaveAttribute('aria-expanded', 'true')
    fireEvent.click(day)
    expect(day).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(day)
    expect(day).toHaveAttribute('aria-expanded', 'true')
  })

  it('toggles the like button', () => {
    withProvider(<TourDetailScreen />)
    const button = screen.getByRole('button', { name: '투어 저장' })
    expect(button.querySelector('svg')).not.toHaveAttribute('fill', 'currentColor')
    fireEvent.click(button)
    expect(button.querySelector('svg')).toHaveAttribute('fill', 'currentColor')
  })
})
