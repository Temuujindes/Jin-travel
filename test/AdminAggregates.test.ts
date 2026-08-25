import { calculateDashboardMetrics, buildInquiryGrowth, calculateInquiryConversion, formatTrend } from '../lib/admin-aggregates'

describe('admin aggregate calculations', () => {
  it('formats neutral, positive, and negative trends', () => {
    expect(formatTrend(2, 0)).toBe('—')
    expect(formatTrend(3, 2)).toBe('+50%')
    expect(formatTrend(1, 2)).toBe('-50%')
  })

  it('calculates confirmed booking conversion and handles empty bookings', () => {
    expect(calculateInquiryConversion([])).toBeNull()
    expect(calculateInquiryConversion([{ status: 'Баталгаажсан' }, { status: 'Шинэ' }, { status: 'Баталгаажсан' }])).toBe(67)
  })

  it('calculates dashboard KPIs and honest trends', () => {
    const now = new Date('2026-08-25T12:00:00Z')
    const metrics = calculateDashboardMetrics([
      { createdAt: new Date('2026-08-25T00:00:00Z'), totalPrice: 580 },
      { createdAt: new Date('2026-08-10T00:00:00Z'), totalPrice: 1000 },
      { createdAt: new Date('2026-07-10T00:00:00Z'), totalPrice: 200 },
    ], [
      { status: 'active', createdAt: new Date('2026-08-01T00:00:00Z') },
      { status: 'draft', createdAt: new Date('2026-07-01T00:00:00Z') },
    ], now)
    expect(metrics).toEqual({
      totalBookings: 3,
      monthlyBookings: 2,
      revenue: 1780,
      activeTours: 1,
      bookingTrend: '+100%',
      revenueTrend: '+690%',
      tourTrend: '+1',
    })
  })

  it('buckets inquiry growth by month and ignores other years', () => {
    expect(buildInquiryGrowth([
      { createdAt: new Date('2026-01-05T00:00:00Z') },
      { createdAt: new Date('2026-01-20T00:00:00Z') },
      { createdAt: new Date('2025-02-20T00:00:00Z') },
    ], new Date('2026-08-25T00:00:00Z'))).toEqual([
      { name: 'Jan', value: 2 },
      { name: 'Feb', value: 0 },
      { name: 'Mar', value: 0 },
      { name: 'Apr', value: 0 },
      { name: 'May', value: 0 },
      { name: 'Jun', value: 0 },
      { name: 'Jul', value: 0 },
      { name: 'Aug', value: 0 },
      { name: 'Sep', value: 0 },
      { name: 'Oct', value: 0 },
      { name: 'Nov', value: 0 },
      { name: 'Dec', value: 0 },
    ])
  })

  it('uses a neutral tour trend when no tours were created this month', () => {
    expect(calculateDashboardMetrics([], [{ status: 'draft', createdAt: new Date('2026-07-01T00:00:00Z') }], new Date('2026-08-25T12:00:00Z')).tourTrend).toBe('—')
  })
})
