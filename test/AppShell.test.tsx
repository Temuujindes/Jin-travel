import { fireEvent, screen } from '@testing-library/react'
import { Header, BottomNav } from '../components/AppShell'
import { withProvider } from './helpers'
import { setMockPathname } from './navigation'

describe('AppShell navigation', () => {
  beforeEach(() => setMockPathname('/'))

  it('marks the selected header language and changes it', () => {
    withProvider(<Header />)
    const mn = screen.getByRole('button', { name: 'MN' })
    const en = screen.getByRole('button', { name: 'EN' })
    expect(screen.getByRole('button', { name: 'KR' })).toHaveClass('active')
    fireEvent.click(en)
    expect(en).toHaveClass('active')
    expect(mn).not.toHaveClass('active')
  })

  it('adds and removes the scrolled class and unsubscribes on unmount', () => {
    const { container, unmount } = withProvider(<Header />)
    const header = container.querySelector('header')!
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 30 })
    fireEvent.scroll(window)
    expect(header).toHaveClass('scrolled')
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 10 })
    fireEvent.scroll(window)
    expect(header).not.toHaveClass('scrolled')
    unmount()
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 40 })
    fireEvent.scroll(window)
    expect(header).not.toHaveClass('scrolled')
  })

  it('uses the mocked pathname for active bottom navigation and prefers a provided translator', () => {
    setMockPathname('/tours')
    withProvider(<BottomNav t={(key) => key === 'home' ? 'Provided home' : `provided ${key}`} />)
    expect(screen.getByRole('link', { name: 'provided tours' })).toHaveClass('active')
    expect(screen.getByRole('link', { name: 'Provided home' })).toBeInTheDocument()
  })
})
