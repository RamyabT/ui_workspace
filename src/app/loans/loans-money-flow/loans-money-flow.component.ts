import { formatCurrency } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild, inject } from '@angular/core';
import { AppConfigService } from '@dep/services';
import * as d3 from 'd3';

@Component({
  selector: 'app-loans-money-flow',
  templateUrl: './loans-money-flow.component.html',
  styleUrls: ['./loans-money-flow.component.scss']
})
export class LoansMoneyFlowComponent implements OnInit {
  protected _appConfig: AppConfigService = inject(AppConfigService);

  @ViewChild('chartContainer') chartContainer!: ElementRef;
  private _chartdData: any;
  @Input()
  set chartData(_data: any) {
    this._chartdData = _data;
    setTimeout(()=>{
      this.updateChart(this._chartdData);
    });
  }
  get chartData() {
    return this._chartdData;
  }

  data: any = [];
  svg: any;
  width: number = 0;
  height: number = 0;
  margin: any = { top: 60, bottom: 40, left: 32, right: 12 };
  xAxis: any;
  yAxis: any;
  yScale: any;
  xAxisGroup: any;
  yAxisGroup: any;
  chart: any;
  moneyInLineGroup: any;
  moneyOutLineGroup: any;
  yValues: any = {};
  pinLine: any;
  pinCircle: any;
  pinText: any;
  pinGroup: any;
  g: any;
  domains: any;
  svgHeight: number = 280;
  yAxisGrid: any;

  constructor() { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    let w = this.chartContainer.nativeElement.getClientRects()[0].width;
    this.width = w - this.margin.left - this.margin.right;
    this.height = this.svgHeight - this.margin.top - this.margin.bottom;

    this.svg = d3.select(this.chartContainer.nativeElement)
      .append('svg')
      .attr('class', 'money-flow-chart')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom);

    this.g = this.svg
      .append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

    
    this.yAxisGroup = this.g
      .append('g')
      .attr('class', 'y-axis');

    this.chart = this.g
      .append('g')
      .attr('class', 'chart')
      .attr('transform', 'translate(0)');
    
    this.xAxisGroup = this.chart
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', 'translate(0,' + this.height + ')');

    this.moneyInLineGroup = this.chart
      .append('path')
      .attr('class', 'data-line');

    this.moneyOutLineGroup = this.chart
      .append('path')
      .attr('class', 'data-money-out-line');
  }

  updateChart(_data:any){
    this.yValues = {};
    if(this.pinLine) this.pinLine.remove();
    if(this.pinCircle) this.pinCircle.remove();
    if(this.pinText) this.pinText.remove();

    const transition = d3.transition().duration(1000);
    this.domains = _data.map((obj: any) => obj.month);

    // adding X scale
    this.xAxis = d3.scalePoint()
    .domain(this.domains)
    .range([0, this.width]);

    // adding Y scale
    this.yAxis = d3.scaleLinear()
    .domain([0, Number(d3.max(_data, (d: any) => Math.max(d.moneyIn, d.moneyOut)))])
    .range([this.height-10, 0]);

    let xAxisCell = d3.axisBottom(this.xAxis);
    this.xAxisGroup.transition(transition).call(xAxisCell);
    this.moneyInLineGroup.transition(transition).call(this.xAxis);
    this.moneyOutLineGroup.transition(transition).call(this.xAxis);

    let yAxisCell = d3.axisLeft(this.yAxis).ticks(5);
    this.yAxisGroup.transition(transition).call(yAxisCell);

    this.yAxisGrid = d3
        .axisRight(this.yAxis)
        .tickSize(this.width)
        .ticks(5)
        .tickFormat((d:any) => {
          return d;
        });

      this.yAxisGroup
        .append('g')
        .attr('class', 'y axis-grid')
        .call(this.yAxisGrid);

    let line = d3.line()
      .curve(d3.curveMonotoneX)
      .x((d:any) => this.xAxis(d.month))
      .y((d:any) => {
        this.yValues[d.month] = d.moneyIn;
        return this.yAxis(d.moneyIn);
      });

    let _linePath = this.chart.select('.data-line').data([_data]);
    _linePath.exit().transition(transition).remove();

    _linePath.attr('fill', 'none')
      .attr('transform', 'translate(0,0)')
      .attr('stroke', 'var(--chart-line-clr)')
      .attr('stroke-width', 2.3)
      .transition(transition)
      .attr('d', line);

    let moneyOutLine = d3.line()
      .curve(d3.curveMonotoneX)
      .x((d:any) => this.xAxis(d.month))
      .y((d:any) => {
        this.yValues[d.month] = d.moneyOut;
        return this.yAxis(d.moneyOut);
      });

    let _moneyOutLinePath = this.chart.select('.data-money-out-line').data([_data]);
    _moneyOutLinePath.exit().transition(transition).remove();

    _moneyOutLinePath.attr('fill', 'none')
      .attr('transform', 'translate(0,0)')
      .attr('stroke', '#E40021')
      .attr('stroke-width', 2.3)
      .transition(transition)
      .attr('d', moneyOutLine);

      this.svg.selectAll('.x-axis .tick').on("click", this.xAxisClick.bind(this));
  }

  xAxisClick(d:any){
    const transition = d3.transition().duration(1000);

    let target = d.target.__data__;
    const value = this.yValues[target];
    let targetX = this.xAxis(target);
    let targetY = this.yAxis(value);
    const x1 = targetX;
    const y1 = this.height;
    const x2 = targetX;
    const y2 = targetY;

    if(this.pinLine) this.pinLine.remove();
    if(this.pinCircle) this.pinCircle.remove();
    if(this.pinText) this.pinText.remove();

    this.pinLine = this.g
      .append('line')
      .attr('class', 'pinned-line')
      .attr("x1", x1)
      .attr("y1", y1)
      .attr("x2", x2)
      .attr("y2", y2);

    this.pinCircle = this.g
      .append('circle')
      .attr('class', 'pinned-circle')
      .attr("r", 4)
      .attr("cx", x2)
      .attr("cy", y2);

    let t = formatCurrency(value, 'en-US', this._appConfig.baseCurrency, this._appConfig.baseCurrency);

    let clasName = 'pinned-text';
    if(this.domains.indexOf(target) == this.domains.length -1) clasName = clasName + ' last-point';
    else if(this.domains.indexOf(target) == 0) clasName = clasName + ' first-point';

    this.pinText = this.g
      .append("text")
      .attr('class', clasName)
      .attr("x", x2)
      .attr("y", y2 - 10)
      .text(t);
      
  }

}
