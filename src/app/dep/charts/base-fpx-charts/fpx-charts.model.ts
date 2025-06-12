export interface chartObjects {
  refreshFlag: boolean;
  navigationFlag: boolean;
  xLabel: string;
  yLabel: string;
  svgWidth: number;
  svgHeight: number;
  marginLeft: string;
  marginRight: string;
  marginTop: string;
  marginBottom: string;
  // dataSets: string;

  _chartData: any;
  _colors: any
  thickness: any;
  barWidth: any;
  barRadius: any;
  gridThickness: any;
  strokeWidth:any;
  sorting: boolean;
  padAngle: any;
  innerRadius: any;
  outerRadius: any;
  fontColor: any;
  fontSize: any;
  textAnchor: any;
  rangeValues: number;
  circularChartBackgroundColor: any;
  
  circularconfig_Thickness:any;

  columnconfig_paddingInner:number;
  columnconfig_paddingOuter:number;
  padding:any;
  columnconfig_keys:any;
  columnconfig_groupKey:string;

  data:any;


  size: string,
  clipWidth: string,
  clipHeight: string,
  ringInset: string,
  ringWidth: string,
  pointerWidth: string,
  pointerTailLength: string,
  pointerHeadLengthPercent: string,

  minValue: string,
  maxValue: string,
  minAngle: string,
  maxAngle: string,
  transitionMs: string,
  majorTicks: string,
  labelFormat: string,
  labelInset: string,
  arcColorFn: [],
  value: '',

  setSize:'',
  setWidth:'',
  setHeight:'',
  setRingInset:'',
  setRingWidth:'',
  setPointerWidth:'',
  setPointerTailLength:'',
  setPointerHeadLengthPercent:''

  chartX: number,
  chartY: number,

  division : number | null
}

export interface layoutObjects{
  title :string,
  subtitle: string,
  currencylayout_totalCount:string,
  currencylayout_currencyList: any,
  currencylayout_timePeriodList: any,
  currencylayout_defaultCurrency: any,
  currencylayout_defaultTime: any
}


// export interface currencyLayoutConfigurations {
//   title: string;
//   subtitle: string;
//   currencyList: any;
//   totalCount: string;
//   timePeriodList: any;
//   data: any;

//   defaultCurrency:any,
//   defaultTimePeriod: any,
//   colorSchemeList: any
// }

export interface plainLayoutConfigurations{
title: string;
subtitle: string;
data: any;
colorSchemeList: any;
}



// export interface chartObjects {
//   refreshFlag: boolean;
//   navigationFlag: boolean;
//   xLabel: string;
//   yLabel: string;
//   svgWidth: number;
//   svgHeight: number;
//   marginLeft: string;
//   marginRight: string;
//   marginTop: string;
//   marginBottom: string;
//   // dataSets: string;

//   _chartData: any;
//   _colors: any
//   thickness: any;

//   chartX: number,
//   chartY: number
// }

// export interface layoutObjects{
//   title :string,
//   subtitle: string,
//   currencylayout_totalCount:string,
//   currencylayout_currencyList: any,
//   currencylayout_timePeriodList: any,
//   currencylayout_defaultCurrency: any,
//   currencylayout_defaultTime: any
// }


// export interface currencyLayoutConfigurations {
// title: string;
// subtitle: string;
// currencyList: any;
// totalCount: string;
// timePeriodList: any;
// data: any;

// defaultCurrency:any,
// defaultTimePeriod: any,
// colorSchemeList: any
// }

// export interface plainLayoutConfigurations{
// title: string;
// subtitle: string;
// data: any;
// colorSchemeList: any;
// }



// export interface chartObjects {
//     refreshFlag: boolean;
//     navigationFlag: boolean;
//     xLabel: string;
//     yLabel: string;
//     svgWidth: number;
//     svgHeight: number;
//     marginLeft: string;
//     marginRight: string;
//     marginTop: string;
//     marginBottom: string;
//     // dataSets: string;

//     _chartData: any;
//     _colors: any
//     thickness: any;

//     circularconfig_Thickness:any;

//     columnconfig_paddingInner:number;
//     columnconfig_paddingOuter:number;
//     columnconfig_keys:any;
//     columnconfig_groupKey:string;

//     data:any;


//     size: string,
//     clipWidth: string,
//     clipHeight: string,
//     ringInset: string,
//     ringWidth: string,
//     pointerWidth: string,
//     pointerTailLength: string,
//     pointerHeadLengthPercent: string,

//     minValue: string,
//     maxValue: string,
//     minAngle: string,
//     maxAngle: string,
//     transitionMs: string,
//     majorTicks: string,
//     labelFormat: string,
//     labelInset: string,
//     arcColorFn: [],
//     value: '',

//     setSize:'',
//     setWidth:'',
//     setHeight:'',
//     setRingInset:'',
//     setRingWidth:'',
//     setPointerWidth:'',
//     setPointerTailLength:'',
//     setPointerHeadLengthPercent:''

//     chartX: number,
//     chartY: number
//   }

// export interface layoutObjects{
//     title :string,
//     subtitle: string,
//     currencylayout_totalCount:string,
//     currencylayout_currencyList: any,
//     currencylayout_timePeriodList: any,
//     currencylayout_defaultCurrency: any,
//     currencylayout_defaultTime: any
// }


// // export interface currencyLayoutConfigurations {
// //   title: string;
// //   subtitle: string;
// //   currencyList: any;
// //   totalCount: string;
// //   timePeriodList: any;
// //   data: any;

// //   defaultCurrency:any,
// //   defaultTimePeriod: any,
// //   colorSchemeList: any
// // }

// export interface plainLayoutConfigurations{
//   title: string;
//   subtitle: string;
//   data: any;
//   colorSchemeList: any;
// }
