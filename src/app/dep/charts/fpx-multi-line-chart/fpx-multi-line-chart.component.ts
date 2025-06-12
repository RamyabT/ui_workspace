import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  BaseFpxChartComponent,
  BaseFpxChartHelper,
} from '../base-fpx-charts/base-fpx-charts.component';
import * as d3 from 'd3';
import { CHARTS } from '../base-fpx-charts/charts.token';

@Component({
  selector: 'fpx-multi-line-chart',
  templateUrl: './fpx-multi-line-chart.component.html',
  styleUrls: ['./fpx-multi-line-chart.component.scss'],
  providers: [
    {
      provide: CHARTS,
      useExisting: FpxMultiLineChartComponent,
      multi: true,
    },
  ],
})
export class FpxMultiLineChartComponent extends BaseFpxChartComponent<BaseFpxChartHelper> {
  private lineGroup: any = {};
  private lineMap:Map<String,any> = new Map();

  @Input() xValue: any = 'id';
  @Input() yValue: any = [];
  @Input() additionalKeys: any = [];

  xValueSet: any = [];
  max_Value_In_Y_Axis: number = 0;
  svg!: d3.Selection<SVGSVGElement, unknown, null, undefined>;

  constructor(private elementRef: ElementRef) {
    super();
  }

  override getCallChartData() {
    let xValue = this.xValue;
    let yValue = this.yValue;

    const keysToPick = [this.xValue, ...this.yValue,...this.additionalKeys];

    let combinedData: any = [];

    this.data.map((obj: any) => {
      const pickedObj = keysToPick.reduce((result, key) => {
        if (obj.hasOwnProperty(key)) {
          result[key] = obj[key];
        }

        return result;
      }, {});

      return combinedData.push(pickedObj);
    });
    this.data = combinedData;

    let ChartData = this.data;

    let XAxisObjectValues: any = this.data.map((_: any) => _[this.xValue]);
    this.xValueSet = XAxisObjectValues;

    let maxValue: any = [];

    ChartData.forEach((element: any) => {
      let { [xValue]: skip, ...remaining } = element;

      let IfStringToNumberForYaxis = Object.values(remaining);
      let YAxisObjectvalues: any = IfStringToNumberForYaxis.map((_: any) => +_);
      maxValue.push(Math.max.apply(null, YAxisObjectvalues));
    });

    let maxValueOfChartData = Math.max.apply(null, maxValue);

    this.max_Value_In_Y_Axis = maxValueOfChartData;

    if (this.data.length > 0) {
      setTimeout(() => {
        this.createSvg();
      }, 500);
    }
  }

  override doChanges() {}

  createSvg(): void {
    if (this.svg) {
      d3.select(this.elementRef.nativeElement).selectAll('*').remove();
    }
    const strokeWidth = this.chartConfigurations.strokeWidth;
    const gridThickness = this.chartConfigurations.gridThickness;
    const xLabel = this.chartConfigurations.xLabel;
    const yLabel = this.chartConfigurations.yLabel;
    const fontSize = this.chartConfigurations.fontSize;
    const fontColor = this.chartConfigurations.fontColor;
    const textAnchor = this.chartConfigurations.textAnchor;

    var data = this.data;

    const margin: any = {
        top: this.chartConfigurations.marginTop,
        right: this.chartConfigurations.marginRight,
        left: this.chartConfigurations.marginLeft,
        bottom: this.chartConfigurations.marginBottom,
      },
      width = this.chartConfigurations.svgWidth,
      height = this.chartConfigurations.svgHeight;

    let marginLeft = margin.left;
    let marginTop = margin.top;
    let marginBottom = margin.bottom;

    let svgHeight: any = height - (margin.top + margin.bottom);
    let svgWidth: any = width - (margin.left + margin.right);

    let colors: any = ['red', 'green', 'blue', 'brown'];

    const color = d3.scaleOrdinal(this.chartConfigurations._colors || colors);

    /** @description Division between the bars */

    // const finalVal = Math.ceil(this.max_Value_In_Y_Axis / 200);

    // const domainKey = [];
    // for (let i = 0; i <= finalVal; i++) {
    //   domainKey.push((i * 200).toString());
    // }

    // const y1 = d3.scalePoint().domain(domainKey).range([svgHeight, 0]);

    // const yAxisGrid = d3.axisLeft(y1)

    /**  */

    const xScale: any = d3
      .scaleBand()
      .domain(this.xValueSet)
      .range([0, svgWidth]);

    const yScale = d3
      .scaleLinear()
      .domain([0, this.max_Value_In_Y_Axis * 1.1])
      .range([svgHeight, 0])
      .nice();

    const xAxisStart = xScale.domain()[0];

    const xPosition: any = (xScale(xAxisStart) as any) + xScale.bandwidth() / 2;

    const xAxisEnd = xScale.domain()[xScale.domain().length - 1];

    const xEndingPosition: any =
      (xScale(xAxisEnd) as any) + xScale.bandwidth() / 2;

    this.svg = d3
      .select(this.elementRef.nativeElement)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', "0 0 " + width + " " + (height+15));

    const svgInner = this.svg
      .append('g')
      .attr('class', 'fpx-multi-line-chart')
      .attr('transform', `translate(${marginLeft},${marginTop})`);

    const xAxis = svgInner
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(${0},${height - marginBottom + 5})`);

    const yAxis = svgInner
      .append('g')
      .attr('class', 'y axis')
      .attr('transform', `translate(35, ${marginBottom})`);

    this.yValue.forEach((element: any, index: number) => {
      this.legends[index] = {
        id: element,
        text: element,
        color: color(element) as string,
      };
      if(element.toLowerCase().includes('dashed')){
        this.lineGroup[element] = svgInner
        .append('g')
        .attr('class', 'line')
        .append('path')
        .style('fill', 'none')
        .style('stroke', color(element) as string)
        .style('stroke-width', strokeWidth)
        .attr('stroke-dasharray',"4 2");
      }
      else{
        this.lineGroup[element] = svgInner
        .append('g')
        .attr('class', 'line')
        .append('path')
        .style('fill', 'none')
        .style('stroke', color(element) as string)
        .style('stroke-width', strokeWidth);
      }
    });

    const xAxisCall = d3.axisBottom(xScale).tickSize(0).tickValues(null);
    xAxis.call(xAxisCall).select('.domain').remove();
    xAxis.selectAll('text').style('fill', 'grey');

    const ticksAmount = 5;
    const tickStep = (this.max_Value_In_Y_Axis - 0) / (ticksAmount);
    const step = Math.ceil(tickStep / 5) * 5;

    const yAxisCall = d3.axisLeft(yScale)
      .tickSize(ticksAmount)
      .tickValues(d3.range(0, this.max_Value_In_Y_Axis + step, step))
      .tickFormat(d3.format('d'));
    yAxis.call(yAxisCall).select('.domain').remove();
    yAxis.selectAll('text').style('fill', 'grey');

    const xAxisGrid = d3
      .axisBottom(xScale)
      .tickSize(svgHeight)
      .tickValues(null);

    const yAxisGrid = d3
      .axisLeft(yScale)
      .tickSize(-xEndingPosition + xPosition)
      .ticks(5);

    const gridCallX = svgInner
      .append('g')
      .attr('class', 'gridCallX')
      .attr('stroke-width', gridThickness)
      .attr('transform', `translate(${0},${0})`)
      .call(xAxisGrid);

    gridCallX.select('.domain').remove();

    gridCallX.selectAll('text').remove();

    const gridCallY = svgInner
      .append('g')
      .attr('class', 'gridCallY fpx-multi-line-y-axis')
      .attr('stroke-width', gridThickness)
      .attr('transform', `translate(${xPosition},${0})`)
      .call(yAxisGrid);

    gridCallY.select('.domain').remove();

    gridCallY
      .selectAll('text')
      // .style('fill','#8F8F8F')
      .remove();
      const imageWidth = 30;
      const imageHeight = 30;
    this.svg
      .append('text')
      .attr('class', 'x label')
      .attr('text-anchor', 'end')
      .attr('x', width / 2)
      .attr('y', height - 5)
      .text(xLabel);

    this.svg
      .append('text')
      .attr('class', 'y label')
      .attr('text-anchor', 'end')
      .attr('y', 0)
      .attr('x', -svgHeight / 2)
      .attr('dy', '.75em')
      .attr('transform', 'rotate(-90)')
      .text(yLabel);


      // svg.selectAll('image')
      // .data(data)
      // .enter()
      // .append('image')
      // .attr('xlink:href', "./assets/fb/member.png") // Specify the path to your image
      // .attr('y', '50%')
      // .attr('x', -svgHeight / 2)
      // .attr('dy', '.75em')
      // .attr('transform', 'rotate(-90)')
      // .attr('width', imageWidth)
      // .attr('height', imageHeight);

    this.yValue.forEach((element: any) => {
      const line = d3
        .line()
        .x((d : any) => d[0])
        .y((d : any) => d[1]);
      
      line.curve(d3.curveBasis);
      

      const pts: any = [];
      const dashedPts: any = [];
      let lineItem:any = {};
      const points: [number, number][] = this.data.map((d: any) => {
        lineItem = {
          points: [xScale(d[this.xValue]) + xPosition, yScale(d[element])],
          item: d,
          isDashed: d.isDashed
        }
        if(element.toLowerCase().includes('dashed') && d.isDashed){
          let i:any=element.toLowerCase().replace('dashed','');
          dashedPts.push([xScale(d[this.xValue]) + xPosition, yScale(d[i])]);
        }
        else if(!element.toLowerCase().includes('dashed') && !d.isDashed){
          pts.push([xScale(d[this.xValue]) + xPosition, yScale(d[element])]);
        }
      });
      if(element.toLowerCase().includes('dashed')){
        let i: any = element.toLowerCase().replace('dashed', '');
        let oldLine: any = this.lineMap.get(i);
        let length: any = this.lineMap.get(i).length;
        let lastPoint: any = oldLine[length - 1];
        let mDashedPts:any=dashedPts.toSpliced(0, 0, lastPoint);
        this.lineGroup[element].attr('d', line(mDashedPts));
      }
      else{
        this.lineMap.set(element,pts);
        this.lineGroup[element].attr('d', line(pts));
      }
    });

    let yValues: any = this.yValue;
    for (let a of yValues) {
      // let dots = svgInner
      //   .selectAll('yValues')
      //   .data(data)
      //   .enter()
      //   .append("circle")
      //   .attr("fill", "red")
      //   .attr("stroke", "none")
      //   .attr("cx", (d: any) => xScale(d[this.xValue]) + xPosition)
      //   .attr("cy", (d: any) => yScale(d[a]) as number)
      //   .attr("r", 1);
      /**
       * to show the value of the each point
       */
      /* let lineTexts = svgInner
        .selectAll('yValue')
        .data(data)
        .enter()
        .append('text')
        .attr('class', 'line-text')
        .attr('x', (d: any) => xScale(d[this.xValue]) + xPosition)
        .attr('y', (d: any) => {
          return yScale(d[a]) as number;
        })
        .style('fill', fontColor)
        .style('font-size', fontSize)
        .style('font-weight', 'bold')
        .attr('text-anchor', textAnchor)
        .text((d: any) => d[a])
        .attr('cursor', 'default')
        .style('opacity', 1);
        */
      // lineTexts
      //   .on('mouseover', (event, d: any) => {
      //     lineTexts.filter((_: any) => _ === d)
      //       .style('opacity', 1);
      //   })
      //   .on('mouseout', (event, d: any) => {
      //     lineTexts.style('opacity', 0);
      //   });
    }
  }

  getDashedParts(_data:any, lookingForDashed:boolean = false) {
    const results:any = [];
    let previousWasMatch = false;
    
    // For every node we add, we need also the node just before,
    // so we can draw a line between them
    _data.forEach((v:any, i: number) => {
      if(lookingForDashed === !!v.isDashed) {
        if (!previousWasMatch && i > 0) {
          results.push(_data[i - 1]);
        }
        results.push(v.points);
        previousWasMatch = true;
      } else {
        let _v:any = {};
        _v[this.xValue] = _data.item[this.xValue];
        _v[_v.element] = NaN;
        results.push(_v);
        previousWasMatch = false;
      }
    });
    
    // console.log(results);
    return results;
  }

}
