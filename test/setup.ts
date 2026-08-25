import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import React from 'react'
import { afterEach, vi } from 'vitest'
import { getMockPathname } from './navigation'

afterEach(() => cleanup())

vi.mock('next/image', () => ({
  default: ({ fill: _fill, priority: _priority, sizes: _sizes, quality: _quality, placeholder: _placeholder, blurDataURL: _blurDataURL, ...props }: Record<string, unknown>) =>
    React.createElement('img', props, props.children as React.ReactNode),
}))
vi.mock('next/link', () => ({
  default: ({ children, ...props }: Record<string, unknown>) => React.createElement('a', props, children as React.ReactNode),
}))

vi.mock('next/navigation', () => ({
  usePathname: () => getMockPathname(),
  useRouter: () => ({ refresh: vi.fn() }),
  notFound: () => {
    throw new Error('NEXT_HTTP_ERROR_FALLBACK;404')
  },
}))

vi.mock('framer-motion', () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  motion: {
    div: ({ children, initial: _initial, animate: _animate, exit: _exit, ...props }: Record<string, unknown>) =>
      React.createElement('div', props, children as React.ReactNode),
  },
}))
