import { screen } from '@testing-library/react'
import { vi } from 'vitest'
import AnalyticsScreen from '../components/admin/AnalyticsScreen'
import { withProvider } from './helpers'

vi.mock('recharts', () => {
  const Container = ({ children }: { children: React.ReactNode }) => <div>{children}</div>
  const Chart = ({ children }: { children: React.ReactNode }) => <div>{children}</div>
  const Leaf = () => null
  return {
    ResponsiveContainer: Container,
    BarChart: Chart,
    PieChart: Chart,
    Bar: Leaf,
    CartesianGrid: Leaf,
    Cell: Leaf,
    Pie: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    Tooltip: Leaf,
    XAxis: Leaf,
    YAxis: Leaf,
  }
})

it('renders analytics cards and charts inside the language provider', () => {
  withProvider(<AnalyticsScreen popular={[{ name: 'Gobi', value: 2 }]} growth={[{ name: 'Jan', value: 2 }]} growthTrend="—" />)
  expect(screen.getByRole('heading', { name: '분석' })).toBeInTheDocument()
  expect(screen.getByText('시장별 트래픽')).toBeInTheDocument()
  expect(screen.getByText('인기 투어')).toBeInTheDocument()
  expect(screen.getByText('문의 성장')).toBeInTheDocument()
})

it('renders localized empty states when booking charts have no data', () => {
  withProvider(<AnalyticsScreen popular={[]} growth={[{ name: 'Jan', value: 0 }]} growthTrend="—" />)
  expect(screen.getAllByText('현재 표시할 데이터가 없습니다.')).toHaveLength(2)
})
