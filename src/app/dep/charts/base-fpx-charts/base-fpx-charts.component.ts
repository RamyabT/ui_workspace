import {
  AfterViewInit,
  Directive,
  Injectable,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { BaseFpxDataService } from '@fpx/core';
import { FpxChartsActionMethod, FpxChartShellAction, FpxChartsHelperHooks } from './base-charts.model';
import { chartObjects, layoutObjects } from './fpx-charts.model';

@Directive()
export class BaseFpxChartComponent<T extends BaseFpxChartHelper>
  implements AfterViewInit, OnChanges {
  public _helper: T | undefined;

  legends: Array<{ id: string; text: string; color: string }> = [];

  data: any;
  @Input() chartConfigurations: any;

  _chartData: any = [];
  public lookupResponse$: Subject<any> = new Subject<any>();
  @Input() lookupTrigger$: Subject<any> = new Subject<any>();
  private readonly destroy$: Subject<any> = new Subject<any>();
  @Input() actionPublisher: Subject<{
    action: FpxChartsActionMethod;
    payload: any;
  }> = new Subject();
  actionMap: Subject<{ action: FpxChartsActionMethod; payload: any }> =
    new Subject();
  @Input() chartsPublisher: Subject<FpxChartShellAction> = new Subject();
  public chartsAction$: Subject<FpxChartShellAction> = new Subject();
  @Input() $helper: T | undefined
  title: any = '';
  public _chartAxisDivision: number | null = null;

  constructor() { }

  calling(data: any) {
    console.log("get data ", data);
    // this._helper.notifyValueChangeHandler()
    console.log(this._helper);

  }

  setHelper(helper: T) {
    this._helper = helper;
  }

  ngOnChanges() {
    this.doChanges();
  }

  ngOnInit() {
    if (this._helper) {
      this._helper.actionMap = this.actionMap;
      this._helper.chartsAction$ = this.chartsAction$;
    }
    this.doPreInit();
    this._helper?.doPreInit();
    this._watchActionPublisher();
  }

  private _watchActionPublisher() {
    this.actionPublisher
      .asObservable()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          // console.log("actionpublisherrrrrrrrrrrrrrrrrrr", res);

          this._actionMethods[res.action]?.(res.payload);
        },
        error: () => { },
        complete: () => { },
      });
  }

  _dataService!: BaseFpxDataService<unknown>;

  public setDataService(service: BaseFpxDataService<unknown>): void {
    this._dataService = service;
    console.log(this._dataService, 'service=---------------------------------')
  }




  private _setTitle = (payload: any) => {
    this.title = payload;
  };

  private _setChartData = (payload: any) => {
    this.data = payload;
    this.getCallChartData();
  };

  private _setDivision = (payload: number | null) => {
    this._chartAxisDivision = payload;
  };

  public getDivision(): number | null {
    return this._chartAxisDivision
  }

  private _actionMethods: {
    [K in FpxChartsActionMethod]: (payload: any) => any;
  } = {
      SETTITLE: this._setTitle,
      SETCHARTDATA: this._setChartData,
      SETDIVISION: this._setDivision,
    };

  setChartData(chartData: Array<any>) {
    this._helper?.setChartDataSet(chartData);
  }

  getChartData() {
    return this._helper?.getChartData();
  }

  getChartLayoutData() {
    return this._helper?.getChartLayoutData();
  }

  ngAfterViewInit() {
    this.doPostInit();
    this._helper?.doPostInit();
    this.helperToShellSetup();
  }

  helperToShellSetup() {
    this.chartsAction$.next({
      action: 'SETCHARTLAYOUT',
      payload: this._helper?.templateLayout,
    });
  }

  handleActions(event: { eventName: FpxChartsHelperHooks; payload: any }) {
    this._helper?.invokeHookMethod(event.eventName, event.payload);
  }

  /** @description override methods to access the angular life cycle hooks */
  protected doPreInit(): void { }
  protected doPostInit(): void { }
  protected doDestroy(): void { }
  protected doChanges(): void { }
  protected getCallChartData(): void { }
  protected afterngOnChanges(): void { }
}

@Injectable()
export abstract class BaseFpxChartHelper {

  public show: boolean = false;
  public actionMap: Subject<{ action: FpxChartsActionMethod; payload: any }> =
    new Subject();
  private _chartshelperLifeCycle: Map<
    FpxChartsHelperHooks,
    (payload: any) => any
  > = new Map();
  public chartsAction$: Subject<FpxChartShellAction> = new Subject();
  protected _customElement: any;

  public _chartAxisDivision: number | null = null;

  /**
   * create a custom form and register in the charts shell each formcontrol value changes will trigger method in the parent helper
   */
  protected _valueChangeHandlerMap: Map<string, (payload: any) => void> =
    new Map();

  baseChartObject: chartObjects = {
    refreshFlag: false,
    navigationFlag: false,
    xLabel: '',
    yLabel: '',
    svgWidth: 500,
    svgHeight: 250,
    marginLeft: '',
    marginRight: '',
    marginTop: '',
    marginBottom: '',
    // dataSets: '',
    _chartData: [],
    _colors: ['#2C82BE', '#53A8E2', '#76DDFB', '#25CFE9'],
    thickness: '',
    barWidth: '9',
    barRadius: '0',
    gridThickness: '0.1',
    strokeWidth: '2',
    sorting: false,
    padAngle: '0',
    innerRadius: '',
    outerRadius: '50',
    fontColor: '#485465',
    fontSize: '15',
    textAnchor: 'start',
    rangeValues: 10,
    circularChartBackgroundColor: '#ddd',

    circularconfig_Thickness: '',

    columnconfig_paddingInner: 0,
    columnconfig_paddingOuter: 0,
    padding: '0.2',
    columnconfig_keys: [],
    columnconfig_groupKey: '',

    chartX: 0,
    chartY: 0,
    data: [],

    size: '',
    clipWidth: '',
    clipHeight: '',
    ringInset: '',
    ringWidth: '',
    pointerWidth: '',
    pointerTailLength: '',
    pointerHeadLengthPercent: '',

    minValue: '',
    maxValue: '',
    minAngle: '',
    maxAngle: '',
    transitionMs: '',
    majorTicks: '',
    labelFormat: '',
    labelInset: '',
    arcColorFn: [],
    value: '',

    setSize: '',
    setWidth: '',
    setHeight: '',
    setRingInset: '',
    setRingWidth: '',
    setPointerWidth: '',
    setPointerTailLength: '',
    setPointerHeadLengthPercent: '',

    division: null

    //end
  };

  chartLayoutObjects: layoutObjects = {
    title: '',
    subtitle: '',
    currencylayout_totalCount: '',
    currencylayout_currencyList: [],
    currencylayout_timePeriodList: [],
    currencylayout_defaultCurrency: {},
    currencylayout_defaultTime: {},
  };

  /**
   * to choose the layout
   * 1 :> with header
   * 2 => without header
   */
  public templateLayout: '1' | '2' = '1';
  Defaultvalue!: { key: string; value: any; };

  constructor() { }

  public doPreInit(): void { }

  public doPostInit(): void { }

  public chartFilterData(data: any): void { }

  setRefreshFlag(refreshFlag: boolean) {
    this.baseChartObject.refreshFlag = refreshFlag;
  }
 
  setNavigationFlag(navigationFlag: boolean) {
    this.baseChartObject.navigationFlag = navigationFlag;
  }

  setXlabel(xlabel: any) {
    this.baseChartObject.xLabel = xlabel;
  }

  setYlabel(ylabel: any) {
    this.baseChartObject.yLabel = ylabel;
  }

  setSvgWidth(width: any) {
    this.baseChartObject.svgWidth = width;
  }

  setSvgHeight(height: any) {
    this.baseChartObject.svgHeight = height;
  }

  setMarginLeft(marginLeft: any) {
    this.baseChartObject.marginLeft = marginLeft;
  }

  setMarginRight(marginRight: any) {
    this.baseChartObject.marginRight = marginRight;
  }

  setMarginTop(marginTop: any) {
    this.baseChartObject.marginTop = marginTop;
  }
  get getmarginTop() {
    return this.baseChartObject.marginTop;
  }

  setMarginBottom(marginBottom: any) {
    this.baseChartObject.marginBottom = marginBottom;
  }

  setChartDataSet(chartDataSet: any) {
    this.baseChartObject._chartData = chartDataSet;
  }

  setChartColor(colors: Array<string>) {
    this.baseChartObject._colors = colors;
  }

  getChartColor(): Array<string> {
    return this.baseChartObject._colors;
  }

  setThickness(thickness: number) {
    this.baseChartObject.thickness = thickness;
  }

  getThickness(): number {
    return this.baseChartObject.thickness;
  }

  setBarWidth(barWidth: number) {
    this.baseChartObject.barWidth = barWidth;
  }

  setBarRadius(barRadius: number) {
    this.baseChartObject.barRadius = barRadius;
  }

  setGridThickness(gridThickness: number) {
    this.baseChartObject.gridThickness = gridThickness;
  }

  // getGridThickness(): number{
  //   return this.baseChartObject.gridThickness;
  // }

  setStrokeWidth(strokeWidth: number) {
    this.baseChartObject.strokeWidth = strokeWidth;
  }

  // getStrokeWidth(): number{
  //   return this.baseChartObject.strokeWidth;
  // }

  setSorting(sorting: boolean) {
    this.baseChartObject.sorting = sorting;
  }

  // getSorting(): boolean{
  //   return this.baseChartObject.sorting;
  // }

  setPadAngle(padAngle: number) {
    this.baseChartObject.padAngle = padAngle;
  }

  // setInnerRadius(innerRadius: number){
  //   this.baseChartObject.innerRadius = innerRadius;
  // }

  setOuterRadius(outerRadius: number) {
    this.baseChartObject.outerRadius = outerRadius;
  }

  setFontColor(fontColor: any) {
    this.baseChartObject.fontColor = fontColor;
  }

  setFontSize(fontSize: any) {
    this.baseChartObject.fontSize = fontSize;
  }

  setTextAnchor(textAnchor: any) {
    this.baseChartObject.textAnchor = textAnchor;
  }

  /** @description Division between the bars */
  setRangeValues(rangeValues: number) {
    this.baseChartObject.rangeValues = rangeValues;
  }

  setCircularChartBackgroundColor(circularChartBackgroundColor: any) {
    this.baseChartObject.circularChartBackgroundColor = circularChartBackgroundColor;
  }

  setCircularThickness(thickness: number) {
    this.baseChartObject.circularconfig_Thickness = thickness;
  }

  getCircularThickness(): number {
    return this.baseChartObject.circularconfig_Thickness;
  }

  getChartData() {
    return this.baseChartObject;
  }
  getChartLayoutData() {
    return this.chartLayoutObjects;
  }

  setChartPosition(chartX: any, chartY: any) {
    this.baseChartObject.chartX = chartX;
    this.baseChartObject.chartY = chartY;
  }

  ////// Layout Objects

  setTitle(title: string): void {
    this.chartLayoutObjects.title = title;
    this.actionMap.next({
      action: 'SETTITLE',
      payload: title,
    });
  }

  setSubTitle(subTitle: string) {
    this.chartLayoutObjects.subtitle = subTitle;
  }

  setPaddingInner(columnconfig_paddingInner: number) {
    this.baseChartObject.columnconfig_paddingInner = columnconfig_paddingInner;
  }

  getPaddingInner(): number {
    return this.baseChartObject.columnconfig_paddingInner;
  }

  setPaddingOuter(columnconfig_paddingOuter: number) {
    this.baseChartObject.columnconfig_paddingOuter = columnconfig_paddingOuter;
  }

  getPaddingOuter(): number {
    return this.baseChartObject.columnconfig_paddingOuter;
  }

  /** @description Space between the bars */
  setPadding(columnconfig_padding: number) {
    this.baseChartObject.padding = columnconfig_padding;
  }

  getPadding(): number {
    return this.baseChartObject.padding;
  }

  setGroupKey(columnconfig_groupKey: string) {
    this.baseChartObject.columnconfig_groupKey = columnconfig_groupKey;
  }

  getGroupKey(): string {
    return this.baseChartObject.columnconfig_groupKey;
  }

  setKeys(columnconfig_keys: Array<string>) {
    this.baseChartObject.columnconfig_keys = columnconfig_keys;
  }

  getKeys(): Array<string> {
    return this.baseChartObject.columnconfig_keys;
  }

  //end

  // Gauge Chart
  setMinValue(minValue: any) {
    this.baseChartObject.minValue = minValue;
  }
  getMinValue() {
    return this.baseChartObject;
  }
  setMaxValue(maxValue: any) {
    this.baseChartObject.maxValue = maxValue;
  }
  getMaxValue() {
    return this.baseChartObject;
  }
  setMinAngle(minAngle: any) {
    this.baseChartObject.minAngle = minAngle;
  }
  getMinAngle() {
    return this.baseChartObject;
  }
  setMaxAngle(maxAngle: any) {
    this.baseChartObject.maxAngle = maxAngle;
  }
  getMaxAngle() {
    return this.baseChartObject;
  }
  setTransitionMs(transitionMs: any) {
    this.baseChartObject.transitionMs = transitionMs;
  }
  getTransitionMs() {
    return this.baseChartObject;
  }
  setMajorTicks(majorTicks: any) {
    this.baseChartObject.majorTicks = majorTicks;
  }
  getMajorTicks() {
    return this.baseChartObject;
  }
  setLabelFormat(labelFormat: any) {
    this.baseChartObject.labelFormat = labelFormat;
  }
  getLabelFormat() {
    return this.baseChartObject;
  }
  setLabelInset(labelInset: any) {
    this.baseChartObject.labelInset = labelInset;
  }
  getLabelInset() {
    return this.baseChartObject;
  }
  setArcColorFn(arcColorFn: any) {
    this.baseChartObject.arcColorFn = arcColorFn;
  }
  getArcColorFn() {
    return this.baseChartObject;
  }
  setValue(value: any) {
    this.baseChartObject.value = value;
  }
  getValue() {
    return this.baseChartObject;
  }

  setSize(size: any) {
    this.baseChartObject.size = size;
  }
  getSize() {
    return this.baseChartObject;
  }

  getWidth() {
    return this.baseChartObject;
  }

  getHeight() {
    return this.baseChartObject;
  }

  getPointerWidth() {
    return this.baseChartObject;
  }

  getPointerTailLength() {
    return this.baseChartObject;
  }

  getPointerHeadLengthPercent() {
    return this.baseChartObject;
  }

  setCurrencyList(currencyType: any): void {
    this.chartLayoutObjects.currencylayout_currencyList = currencyType;
  }

  setTotalCount(totalCount: string) {
    this.chartLayoutObjects.currencylayout_totalCount = totalCount;
  }

  setTimePeriod(timePeriod: any) {
    this.chartLayoutObjects.currencylayout_timePeriodList = timePeriod;
  }

  setDefaultCurrency(currency: any) {
    this.chartLayoutObjects.currencylayout_defaultCurrency = currency;
  }

  setDefaultTimePeriod(timePeriod: any) {
    this.chartLayoutObjects.currencylayout_defaultTime = timePeriod;
  }
  SetDefaultValue(formControlName: string, payload: any) {

if(formControlName && payload){
  console.log("payload",payload);
  
  this.Defaultvalue = {
    'key':formControlName,
    'value':payload
  }
}
  
  }
  
  
  public addHelperLifeCycleHooks(
    hooks: FpxChartsHelperHooks,
    method: (payload: any) => void
  ) {
    this._chartshelperLifeCycle.set(hooks, method);
  }

  public invokeHookMethod(hooks: FpxChartsHelperHooks, payload: any) {
    if (this._chartshelperLifeCycle.has(hooks)) {
      this._chartshelperLifeCycle.get(hooks)?.(payload);
    }
  }

  public setCustomElement(element: any) {
   
    
    this._customElement = element;
    this.chartsAction$.next({
      action: 'SETCUSTOMELEMENT',
      payload: element,
    });
  }


  public setcustomExternalElement(element: any) {
    this.chartsAction$.next({
      action: 'SETCUSTOMEXTERNALELEMENT',
      payload: element,
    });
  }


  public setChartLayout(layoutType: '1' | '2') {
    this.templateLayout = layoutType;
  }

  public get customElement() {
    return this._customElement;
  }

  public loadChart(chartData: Observable<any>) {
    chartData.subscribe({
      next: (res) => {
        this.setChart(res);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => { },
    });
  }

  public setChart(chartData: any) {
    this.actionMap.next({
      action: 'SETCHARTDATA',
      payload: chartData,
    });
  }

  public addValueChangeHandler(
    formControlName: string,
    changeHandlerMethod: (payload: any) => void
  ) {
    this._valueChangeHandlerMap.set(formControlName, changeHandlerMethod);
  }

  public notifyValueChangeHandler(formControlName: string, payload: any) {
    console.log('helper', formControlName)
    // if (this._valueChangeHandlerMap.has(formControlName)) {
    //   this._valueChangeHandlerMap.get(formControlName)?.(payload);
    // }
    this.chartFilterData({
      formControlName,
      payload
    })

    
  }


  /**
   *
   */
  public setDivisions(count: number) {
    this.baseChartObject.division = count;
    this.actionMap.next({
      action: 'SETDIVISION',
      payload: count,
    });
  }

  public getDivisions(): number | null {
    return this._chartAxisDivision;
  }


}
