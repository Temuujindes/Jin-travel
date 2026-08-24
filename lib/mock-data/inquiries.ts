export interface Inquiry { id: string; customer: string; tour: string; kakao: string; date: string; status: 'Шинэ' | 'Холбогдсон' | 'Баталгаажсан' }

export const inquiries: Inquiry[] = [
  { id: 'inq-01', customer: 'Kim Min-soo', tour: 'Gobi Express & Camel Trekking', kakao: '@minsoo_kim', date: '2026.08.24', status: 'Шинэ' },
  { id: 'inq-02', customer: 'Park Ji-eun', tour: 'Ultimate Gobi & Central Mongolia', kakao: '@jieunpark', date: '2026.08.23', status: 'Холбогдсон' },
  { id: 'inq-03', customer: 'Lee Hyun-woo', tour: 'Khuvsgul Lake Express', kakao: '@hyunwoo.lee', date: '2026.08.22', status: 'Баталгаажсан' },
  { id: 'inq-04', customer: 'Choi Ara', tour: 'Gobi Express & Camel Trekking', kakao: '@ara_choi', date: '2026.08.20', status: 'Шинэ' },
]