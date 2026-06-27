import type { FC } from 'react'
import { SubcontractStructure } from './SubcontractStructure'
import { PublicPrivateFlow } from './groupA'
import {
  PermitTypes,
  PermitRequirements,
  EngineerPlacement,
  ContractElements,
  SubcontractProtection,
} from './groupB'
import {
  Qcdse,
  ProcessChart,
  CriticalPath,
  SafetyHierarchy,
  RiskAssessment,
} from './groupC'
import { ConstructionSystemDoc, DocumentFlow } from './groupD'
import { TaikyoFlow, CcusLevels, InsuranceCoverage } from './groupE'
import { WorkStyle2024, Ninote3Law, IConstruction } from './groupF'
import { ShikakuPath } from './groupG'
import { UkeoiVsJoyo } from './diagramsB2'
import { TomihariSetup, DekigataHistogram, QualityJudgmentFlow, BoringLog } from './diagramsH'
import { CostStructure, EarthworkVolume } from './diagramsI'
import { PileFoundationTypes, ConcreteDefects, EarthRetainingTypes } from './diagramsL'
import { RoadStructure, PavementSection, SlopeProtectionTypes, RetainingWallTypes } from './diagramsM'
import { RevetmentStructure, SaboDamStructure, PipeLaying, PipeJacking } from './diagramsN'
import { BridgeParts, BridgeErection, NatmSupport } from './diagramsO'
import { ExcavationSlope, ScaffoldParts, CraneLoadRadius, LicenseMatrix } from './diagramsP'
import { ConstructionByproducts, RelatedLaws, InspectionCycle } from './diagramsQ'

/**
 * 図キー -> SVG コンポーネントのレジストリ。
 * 本文の `[[diagram:キー]]` から参照される。
 * すべて自作のオリジナル SVG（著作権セーフ）。
 */
export const DIAGRAMS: Record<string, FC> = {
  'subcontract-structure': SubcontractStructure,
  'public-private-flow': PublicPrivateFlow,
  'permit-types': PermitTypes,
  'permit-requirements': PermitRequirements,
  'engineer-placement': EngineerPlacement,
  'contract-elements': ContractElements,
  'subcontract-protection': SubcontractProtection,
  qcdse: Qcdse,
  'process-chart': ProcessChart,
  'critical-path': CriticalPath,
  'safety-hierarchy': SafetyHierarchy,
  'risk-assessment': RiskAssessment,
  'construction-system-doc': ConstructionSystemDoc,
  'document-flow': DocumentFlow,
  'taikyo-flow': TaikyoFlow,
  'ccus-levels': CcusLevels,
  'insurance-coverage': InsuranceCoverage,
  'work-style-2024': WorkStyle2024,
  'ninote-3law': Ninote3Law,
  'i-construction': IConstruction,
  'shikaku-path': ShikakuPath,
  // 拡張グループ（H〜Q・b6）の図
  'ukeoi-vs-joyo': UkeoiVsJoyo,
  'tomihari-setup': TomihariSetup,
  'dekigata-histogram': DekigataHistogram,
  'quality-judgment-flow': QualityJudgmentFlow,
  'boring-log': BoringLog,
  'cost-structure': CostStructure,
  'earthwork-volume': EarthworkVolume,
  'pile-foundation-types': PileFoundationTypes,
  'concrete-defects': ConcreteDefects,
  'earth-retaining-types': EarthRetainingTypes,
  'road-structure': RoadStructure,
  'pavement-section': PavementSection,
  'slope-protection-types': SlopeProtectionTypes,
  'retaining-wall-types': RetainingWallTypes,
  'revetment-structure': RevetmentStructure,
  'sabo-dam-structure': SaboDamStructure,
  'pipe-laying': PipeLaying,
  'pipe-jacking': PipeJacking,
  'bridge-parts': BridgeParts,
  'bridge-erection': BridgeErection,
  'natm-support': NatmSupport,
  'excavation-slope': ExcavationSlope,
  'scaffold-parts': ScaffoldParts,
  'crane-load-radius': CraneLoadRadius,
  'license-matrix': LicenseMatrix,
  'construction-byproducts': ConstructionByproducts,
  'related-laws': RelatedLaws,
  'inspection-cycle': InspectionCycle,
}

/** 未登録キー用のプレースホルダ（執筆中の図） */
export const MissingDiagram: FC<{ diagramKey: string }> = ({ diagramKey }) => (
  <div className="my-6 rounded-lg border border-dashed border-slate-300 dark:border-slate-600 p-4 text-center text-sm text-slate-400">
    （図を準備中: <code>{diagramKey}</code>）
  </div>
)
