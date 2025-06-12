export type FpxChartsHelperHooks  =  'REFRESHGRID'

export type FpxChartsActionMethod = 'SETTITLE' | 'SETCHARTDATA' | 'SETDIVISION'

export type FpxChartShellActionMethod = 'SETCUSTOMELEMENT' | 'SETLEGENDS' | 'SETCHARTLAYOUT'

export interface FpxChartShellAction {
  action : FpxChartShellActionMethod,
  payload : any
}
