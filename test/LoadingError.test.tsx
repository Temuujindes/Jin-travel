import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import HomeError from '../app/error'
import HomeLoading from '../app/loading'
import ToursError from '../app/tours/error'
import ToursLoading from '../app/tours/loading'
import DetailError from '../app/tours/[slug]/error'
import DetailLoading from '../app/tours/[slug]/loading'

describe('public route loading and error states', () => {
  it('uses existing layout classes for each loading state', () => {
    for (const Loading of [HomeLoading, ToursLoading, DetailLoading]) {
      const { container, unmount } = render(<Loading />)
      expect(container.querySelector('[aria-busy="true"]')).toBeInTheDocument()
      expect(container.querySelector('.app')).toBeInTheDocument()
      unmount()
    }
  })

  it('renders inline recovery actions for each error state', () => {
    for (const ErrorState of [HomeError, ToursError, DetailError]) {
      const reset = vi.fn()
      const { unmount } = render(<ErrorState error={new Error('failure')} reset={reset} />)
      expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument()
      expect(document.querySelector('.error')).toBeInTheDocument()
      fireEvent.click(screen.getByRole('button', { name: 'Try again' }))
      expect(reset).toHaveBeenCalledOnce()
      unmount()
    }
  })
})
