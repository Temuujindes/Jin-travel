import { fireEvent, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import DashboardLoginPage from '../app/dashboard/login/page'
import { withProvider } from './helpers'

const mocks = vi.hoisted(() => ({ signIn: vi.fn(), assign: vi.fn() }))
vi.mock('next-auth/react', () => ({ signIn: mocks.signIn }))

describe('DashboardLoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    Object.defineProperty(window, 'location', { configurable: true, value: { assign: mocks.assign } })
  })

  it('shows the localized inline error when credentials are rejected', async () => {
    mocks.signIn.mockResolvedValue({ error: 'CredentialsSignin' })
    withProvider(<DashboardLoginPage />)
    fireEvent.change(screen.getByLabelText('이메일'), { target: { value: 'wrong@example.com' } })
    fireEvent.change(screen.getByLabelText('비밀번호'), { target: { value: 'wrong' } })
    fireEvent.click(screen.getByRole('button', { name: '로그인' }))
    await waitFor(() => expect(screen.getByText('이메일 또는 비밀번호가 올바르지 않습니다.')).toBeInTheDocument())
    expect(screen.getByRole('heading', { name: '다시 오신 것을 환영합니다' })).toBeInTheDocument()
    expect(mocks.assign).not.toHaveBeenCalled()
  })

  it('navigates to the dashboard after successful sign-in', async () => {
    mocks.signIn.mockResolvedValue({ url: 'http://localhost:3000/dashboard' })
    withProvider(<DashboardLoginPage />)
    fireEvent.change(screen.getByLabelText('이메일'), { target: { value: 'admin@example.com' } })
    fireEvent.change(screen.getByLabelText('비밀번호'), { target: { value: 'secret' } })
    fireEvent.click(screen.getByRole('button', { name: '로그인' }))
    await waitFor(() => expect(mocks.assign).toHaveBeenCalledWith('http://localhost:3000/dashboard'))
  })
})
