import { formatCurrency } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild, inject } from '@angular/core';
import { AppConfigService } from '@dep/services';
import * as d3 from 'd3';

@Component({
  selector: 'app-accounts-insights',
  templateUrl: './accounts-insights.component.html',
  styleUrls: ['./accounts-insights.component.scss']
})

export class AccountsInsightsComponent implements OnInit {

  @ViewChild('chartContainer') chartContainer!: ElementRef;

  private _appConfig: AppConfigService = inject(AppConfigService);

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
  margin: any = { top: 20, bottom: 40, left: 12, right: 12 };
  xAxis: any;
  yAxis: any;
  xAxisGroup: any;
  yAxisGroup: any;
  chart: any;
  lineGroup: any;
  yValues: any = {};
  pinLine: any;
  pinCircle: any;
  pinText: any;
  pinGroup: any;
  g: any;
  domains: any;

  constructor() { }

  ngOnInit(): void {
    this.width = screen.width - this.margin.left - this.margin.right;
    this.height = 200 - this.margin.top - this.margin.bottom;
  }

  ngAfterViewInit() {
    this.svg = d3.select(this.chartContainer.nativeElement)
      .append('svg')
      .attr('class', 'money-flow-chart')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom);

    var lg = this.svg.append("defs").append("linearGradient")
      .attr("id", "linearBg")//id of the gradient
      .attr("x1", "0%")
      .attr("x2", "0%")
      .attr("y1", "0%")
      .attr("y2", "100%"); //since its a vertical linear gradient 

    lg.append("stop")
      .attr("offset", "0%")
      .style("stop-color", "var(--chart-lg-start-clr)") // top start color
      .style("stop-opacity", 1);

    lg.append("stop")
      .attr("offset", "100%")
      .style("stop-color", "var(--chart-lg-stop-clr)") // bottom stop color
      .style("stop-opacity", 0);

    this.chart = this.svg
      .append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);
    
    this.xAxisGroup = this.chart
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', 'translate(0,' + this.height + ')');

    this.lineGroup = this.chart
      .append('path')
      .attr('class', 'data-line');

    this.g = this.svg
      .append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);
    
    // this.yAxisGroup = this.g
    //   .append('g')
    //   .attr('class', 'y-axis');
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
    .domain([0, Number(d3.max(_data, (d: any) => Number(d.totalAmount)))])
    .range([this.height, 0]);

    let xAxisCell = d3.axisBottom(this.xAxis);
    this.xAxisGroup.transition(transition).call(xAxisCell);
    this.lineGroup.transition(transition).call(this.xAxis);
    // let yAxisCell = d3.axisLeft(this.yAxis);
    // this.yAxisGroup.transition(transition).call(yAxisCell);

    // join new data with old elements
    let paths = this.chart.selectAll('.x-axis .domain').data([_data]);

    //exit old elements not presents in new data
    paths.exit().transition(transition).remove();

    // create the area chart 
    let area = d3.area()
      .curve(d3.curveMonotoneX)
      .x((d:any) => this.xAxis(d.month))
      .y0(this.yAxis(0))
      .y1((d:any) => {
        return this.yAxis(d.totalAmount);
      });

    let line = d3.line()
      .curve(d3.curveMonotoneX)
      .x((d:any) => this.xAxis(d.month))
      .y((d:any) => {
        this.yValues[d.month] = d.totalAmount;
        return this.yAxis(d.totalAmount);
      });

    let _linePath = this.chart.select('.data-line').data([_data]);
    _linePath.exit().transition(transition).remove();

    // enter new elements not present in new data 
    paths.attr('fill', 'url(#linearBg)')
      .attr('transform', 'translate(0,' + -this.height + ')')
      .transition(transition)
      .attr('d', area);

    _linePath.attr('fill', 'none')
      .attr('transform', 'translate(0,0)')
      .attr('stroke', 'var(--chart-line-clr)')
      .attr('stroke-width', 1.5)
      .transition(transition)
      .attr('d', line);

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
