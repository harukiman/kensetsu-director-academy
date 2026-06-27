import type { ChapterGroup } from './types'

/** 章の大グループ（学習の章立て A〜G） */
export const GROUPS: ChapterGroup[] = [
  { id: 'A', title: '業界・全体像', description: '建設業界の構造と、自社（一次・二次下請）の立ち位置を掴む' },
  { id: 'B', title: '建設業法', description: '許可・技術者・契約・下請保護など、現場を縛る基本法令' },
  { id: 'C', title: '工事管理の実務', description: '施工管理 QCDSE（品質・原価・工程・安全・環境）の実務' },
  { id: 'D', title: '書類・施工体制', description: '建設ディレクターの中核：体制台帳・写真・電子納品・ICT' },
  { id: 'E', title: '福祉・制度', description: '建退共・社会保険・CCUS など技能者を支える仕組み' },
  { id: 'F', title: '最近の動向・将来', description: '2024年問題・改正建設業法・建設DX など今と未来の論点' },
  { id: 'G', title: '学習支援', description: '用語集・略語・新卒ロードマップで学習を支える' },
]

export const groupById = (id: string) => GROUPS.find((g) => g.id === id)
