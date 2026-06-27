import type { ChapterGroup } from './types'

/**
 * 章の大グループ。表示順はこの配列順。
 * A〜F: 基礎・制度・動向 / H〜Q: 実務（業務領域・工種・安全・環境）/ G: 学習支援（最後）
 */
export const GROUPS: ChapterGroup[] = [
  { id: 'A', title: '業界・全体像', description: '建設業界の構造と、自社（一次・二次下請）の立ち位置を掴む' },
  { id: 'B', title: '建設業法・契約', description: '許可・技術者・契約・下請保護、請負と常用など現場を縛る基本法令' },
  { id: 'C', title: '工事管理の実務', description: '施工管理 QCDSE（品質・原価・工程・安全・環境）の実務' },
  { id: 'D', title: '書類・施工体制', description: '建設ディレクターの中核：体制台帳・写真・電子納品・ICT' },
  { id: 'E', title: '福祉・制度', description: '建退共・社会保険・CCUS など技能者を支える仕組み' },
  { id: 'F', title: '最近の動向・将来', description: '2024年問題・改正建設業法・建設DX など今と未来の論点' },
  { id: 'H', title: '測量・出来形・品質管理', description: '丁張り・TS/GNSS、出来形管理基準・規格値、コンクリート/土の品質' },
  { id: 'I', title: '積算・数量・原価', description: '公共工事の積算基準・歩掛、数量計算、実行予算と原価管理' },
  { id: 'J', title: 'CAD・CIM・ICT・電子納品', description: 'CAD製図基準、CIM/BIM、ICT施工、土木の電子納品' },
  { id: 'K', title: '公共工事の契約・書類実務', description: '標準請負契約約款・設計変更・スライド、施工計画書、経審・総合評価' },
  { id: 'L', title: '共通施工技術', description: '土工・基礎工・コンクリート工・仮設工の基本と品質' },
  { id: 'M', title: '道路・舗装・法面・擁壁', description: '道路土工、アスファルト/コンクリート舗装、法面保護、擁壁・土留め' },
  { id: 'N', title: '河川・海岸・砂防・上下水道', description: '護岸・樋門、砂防、管渠布設・推進、上下水道の施工' },
  { id: 'O', title: '橋梁・トンネル・構造物', description: '橋梁の下部工/上部工・架設、山岳/シールドトンネル、PC・鋼構造' },
  { id: 'P', title: '土木の安全衛生（詳細）', description: '掘削・土留め支保工、型枠支保工、建機・クレーン玉掛、酸欠、資格' },
  { id: 'Q', title: '環境・関連法令・維持管理', description: '建設発生土・産廃、騒音振動、関連法令横断、インフラ維持管理・点検' },
  { id: 'G', title: '学習支援', description: '用語集・略語・新卒ロードマップで学習を支える' },
]

export const groupById = (id: string) => GROUPS.find((g) => g.id === id)
