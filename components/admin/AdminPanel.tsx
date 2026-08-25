'use client'

import type { ReactNode } from 'react'

export function AdminPageHeader({ overline, title, description, action, className }: { overline: ReactNode; title: ReactNode; description?: ReactNode; action?: ReactNode; className?: string }) {
  return <header className={className ? `admin-header ${className}` : 'admin-header'}><div><div className="admin-overline">{overline}</div><h1>{title}</h1>{description && <p>{description}</p>}</div>{action}</header>
}

export function PanelHeading({ overline, title, action, className }: { overline: ReactNode; title: ReactNode; action?: ReactNode; className?: string }) {
  return <div className={className || 'panel-heading'}><div><div className="admin-overline">{overline}</div><h2>{title}</h2></div>{action}</div>
}
