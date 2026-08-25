import { fireEvent, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { AdminShell } from '../components/admin/AdminShell'
import { withProvider } from './helpers'
import { setMockPathname } from './navigation'

const signOut = vi.hoisted(() => vi.fn())
vi.mock('next-auth/react', () => ({ signOut }))

describe('AdminShell', () => {
  it('applies exact and nested active navigation rules', () => {
    setMockPathname('/dashboard/tours/builder/edit')
    const { container, unmount } = withProvider(<AdminShell><p>Content</p></AdminShell>)
    expect(screen.getByRole('link', { name: /일정 빌더/ })).toHaveClass('active')
    expect(screen.getByRole('link', { name: /대시보드/ })).not.toHaveClass('active')
    unmount()
    setMockPathname('/dashboard')
    withProvider(<AdminShell><p>Content</p></AdminShell>)
    expect(screen.getByRole('link', { name: /대시보드/ })).toHaveClass('active')
  })

  it('opens and closes the mobile drawer with menu, close, and overlay controls', () => {
    setMockPathname('/dashboard')
    const { container } = withProvider(<AdminShell><p>Content</p></AdminShell>)
    const sidebar = container.querySelector('.admin-sidebar')!
    fireEvent.click(screen.getByRole('button', { name: '대시보드' }))
    expect(sidebar).toHaveClass('is-open')
    fireEvent.click(container.querySelector('.admin-close')!)
    expect(sidebar).not.toHaveClass('is-open')
    fireEvent.click(screen.getByRole('button', { name: '대시보드' }))
    fireEvent.click(container.querySelector('.admin-overlay')!)
    expect(sidebar).not.toHaveClass('is-open')
    fireEvent.click(screen.getByRole('button', { name: '대시보드' }))
    const toursLink = screen.getByRole('link', { name: /투어 패키지/ })
    toursLink.addEventListener('click', (event) => event.preventDefault(), { once: true })
    fireEvent.click(toursLink)
    expect(sidebar).not.toHaveClass('is-open')
    fireEvent.click(screen.getByRole('button', { name: 'EN' }))
    expect(screen.getByRole('button', { name: 'EN' })).toHaveClass('active')
  })

  it('provides a visible localized logout action', () => {
    setMockPathname('/dashboard')
    withProvider(<AdminShell><p>Content</p></AdminShell>)
    fireEvent.click(screen.getByRole('button', { name: '로그아웃' }))
    expect(signOut).toHaveBeenCalledWith({ callbackUrl: '/dashboard/login' })
  })
})
