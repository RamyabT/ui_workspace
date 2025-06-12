import { Component, ElementRef, Input, OnChanges, OnInit } from '@angular/core';
// import {
//   BaseFpxChartComponent,
//   BaseFpxChartHelper,
// } from '../../base/base-fpx-charts.component';
import * as d3 from 'd3';
import { CHARTS } from '../base-fpx-charts/charts.token';
import { BaseFpxChartComponent, BaseFpxChartHelper } from '../base-fpx-charts/base-fpx-charts.component';
// import { CHARTS } from '../../token';

@Component({
  selector: 'fpx-column-chart',
  templateUrl: './fpx-column-chart.component.html',
  styleUrls: ['./fpx-column-chart.component.scss'],
  providers: [
    {
      provide: CHARTS,
      useExisting: FpxColumnChartComponent,
    },
  ],
})
export class FpxColumnChartComponent
  extends BaseFpxChartComponent<BaseFpxChartHelper>
  implements OnChanges {
  @Input() idvalue: any = 'id';
  @Input() textvalue: any = 'text';

  constructor(private elementRef: ElementRef) {
    super();
  }

  override getCallChartData() {
    let chartData: any = [];
    chartData = this.data.map((_: any) => {
      return {
        id: _[this.idvalue],
        text: _[this.textvalue]/1000,
      };
    });

    this.data = [...chartData];

    if (this.data.length > 0) {
      setTimeout(() => {
        this.createSvg();
      }, 500);
    }
  }

  override doChanges() { }

  createSvg(): void {
    const barWidth = this.chartConfigurations.barWidth;
    const barRadius = this.chartConfigurations.barRadius;
    const padding = this.chartConfigurations.padding;
    const gridThickness = this.chartConfigurations.gridThickness;
    const xLabel = this.chartConfigurations.xLabel;
    const yLabel = this.chartConfigurations.yLabel;
    const fontSize = this.chartConfigurations.fontSize;
    const fontColor = this.chartConfigurations.fontColor;
    const textAnchor = this.chartConfigurations.textAnchor;


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

    let svgWidth: any = width - (margin.left + margin.right);
    let svgHeight: any = height - (margin.top + margin.bottom);

    let colors: any = ['red', 'green', 'brown', 'blue'];

    let listValues = this.data.map((d: any) => Number(d.text));

    const color = d3.scaleOrdinal(this.chartConfigurations._colors || colors);

    const svg = d3
      .select(this.elementRef.nativeElement)
      .append('svg')
      .attr('perserveAspectRatio', 'xMinYMin meet')
      .attr('width', width)
      .attr('height', height);

    const chart = svg
      .append('g')
      .attr('transform', `translate(${marginLeft},${marginTop})`);

    const x = d3
      .scaleBand()
      .domain(this.data.map((d: any) => d.id))
      .rangeRound([0, svgWidth])
      // .padding(0.9);
      .padding(padding);

    let maxValue = Math.max.apply(Math, listValues);

    /** @description Division between the bars */

    // const finalVal = Math.ceil(maxValue / 1000);

    const domainKey = [];
    for (let i = 0; i <= maxValue;i+=2) {
      domainKey.push((i * 10));
      if(domainKey[i]>=maxValue) break
    }

    const y = d3
      .scaleLinear()
      .domain([0, maxValue])
      .range([svgHeight, 0])
      .nice();

    svg
      .append('text')
      .attr('class', 'x label')
      .attr('text-anchor', 'end')
      .attr('x', width / 2)
      .attr('y', height - 5)
      .text(xLabel);

    svg
      .append('text')
      .attr('class', 'y label')
      .attr('text-anchor', 'end')
      .attr('y', 0)
      .attr('x', -svgHeight / 2)
      .attr('dy', '.75em')
      .attr('transform', 'rotate(-90)')
      .text(yLabel);

    const xAxis = d3.axisBottom(x).tickSize(0).tickValues(null);

    const yAxis = d3.axisLeft(y)
      .tickValues(domainKey)
      .tickSize(0);

    const yAxisGrid = d3.axisRight(y)
      .tickValues(domainKey)
      .tickSize(width);

    chart
      .append('g')
      .attr('class', 'y axis-grid')
      .attr('stroke-width', gridThickness)
      .attr('stroke-dasharray',"3 3")
      .call(yAxisGrid)
      .select('.domain')
      .remove();

    chart
      .selectAll('text')
      .remove();

    chart
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + (svgHeight + 10) + ')')
      .call(xAxis)
      .selectAll('text')
      .style('fill', '#8F8F8F')
      .style('display','none');
    chart.select('.domain').remove();

    chart
      .append('g')
      .attr('class', 'y axis')
      .attr('transform', 'translate(-10 ,0)')
      .call(yAxis)
      .selectAll('text')
      .style('fill', '#8F8F8F');
    chart.select('.domain').remove();

    chart.selectAll(".y.axis .tick text")
    .text(function (d){
      return d+'k';
    })

    var g = chart.append('g');

    const bars = g
      .attr('class', 'chart')
      .selectAll('rect')
      .data(this.data)
      .enter()
      .append('rect')
      .attr('x', (d: any) => Number(x(d.id)))
      .attr('y', svgHeight) // Start at the bottom
      .attr('width', x.bandwidth())
      .attr('rx', barRadius)
      .attr('height', 0) // Start with zero height
      .attr('fill', (d: any, index: number) => {
        let colr: string = (color(d.id) as string) || '';
        this.legends[index] = {
          ...this.legends[index],
          color: colr,
          text: d.id,
          id: d.text,
        };
        return color(d.id) as string;
      })
      .transition() // Add the transition
      .duration(1000) // Duration of the animation in milliseconds
      .attr('y', (d: any) => Number(y(d.text))) // Final position
      .attr('height', (d: any) => svgHeight - (y(d.text) as number)) // Final height

    let barTexts = chart.selectAll('.bar-text')
      .data(this.data)
      .enter()
      .append('text')
      .attr('class', 'bar-text')
      .attr('x', (d: any) => x(d.id) as number  + 2.5) // Center horizontally
      .attr('y', (d: any) => y(d.text) + -5) // Center vertically (adjust 5 as needed)
      .style("fill", fontColor)
      .style("font-size", fontSize)
      .style('font-weight', 'bold')
      .attr("text-anchor", textAnchor)
      .text((d: any) => d.text + 'k')
      .attr('cursor', 'default')
      .style('opacity', 0);
    bars
      .on('end', function () {
        // Re-bind mouseover and mouseout events after the transition ends
        d3.select(this)
          .on('mouseover', function (event, d) {
            d3.select(this).style('opacity', 0.7); // Example effect on hover
            barTexts.filter((_: any) => _ === d)
              .style('opacity', 1);
          })
          .on('mouseout', function (event, d) {
            d3.select(this).style('opacity', 1); // Revert to original opacity on mouse out
            barTexts.style('opacity', 0);
          });
      });

    // const bars = g
    //   .attr('class', 'chart')
    //   .selectAll('rect')
    //   .data(this.data)
    //   .enter()
    //   .append('rect')
    //   .attr('x', (d: any) => {
    //     return Number(x(d.id));
    //   })
    //   .attr('y', svgHeight) // Start at the bottom
    //   .attr('width', barWidth)
    //   .attr('rx', barRadius)
    //   .attr('height', 0) // Start with zero height
    //   .attr('fill', (d: any, index: number) => {
    //     let colr: string = (color(d.id) as string) || '';
    //     this.legends[index] = {
    //       ...this.legends[index],
    //       color: colr,
    //       text: d.id,
    //       id: d.text,
    //     };
    //     return color(d.id) as string;
    //   })
    //   .transition() // Add the transition
    //   .duration(1000) // Duration of the animation in milliseconds
    //   .attr('y', function (d: any) {
    //     return Number(y(d.text)); // Final position
    //   })
    //   .attr('height', (d: any) => {
    //     return svgHeight - (y(d.text) as number); // Final height
    //   });

    // // const bars = g
    // //   .attr('class', 'chart')
    // //   .selectAll('rect')
    // //   .data(this.data)
    // //   .enter()
    // //   .append('rect')

    // //   .attr('y', function (d: any, index: number) {
    // //     return Number(y(d.text));
    // //   })

    // //   .attr('x', (d: any) => {
    // //     return Number(x(d.id));
    // //   })

    // //   .attr('width', barWidth)

    // //   .attr('rx', barRadius)

    // //   .attr('height', (d: any) => {
    // //     return svgHeight - (y(d.text) as number);
    // //   })

    // //   .attr('fill', (d: any, index: number) => {
    // //     let colr: string = (color(d.id) as string) || '';
    // //     this.legends[index] = {
    // //       ...this.legends[index],
    // //       color: colr,
    // //       text: d.id,
    // //       id: d.text,
    // //     };
    // //     return color(d.id) as string;
    // //   });

    // //static text
    // /*
    //     const text = g
    //       .selectAll('textvalue')
    //       .data(this.data)
    //       .enter()
    //       .append('text')
    //       .attr('class', 'textvalue')
    //       .attr('x', (d: any) => {
    //         return Number(x(d.id));
    //       })
    //       .attr('text-anchor', textAnchor)
    //       .attr('y', (d: any) => {
    //         return Number(y(d.text));
    //       })
    //       .style('fill', fontColor)
    //       .style('font-size', fontSize)
    //       .style('font-weight', 'bold')
    //       .attr('cursor', 'default')
    //       .text((d: any, index: number) => {
    //         return d.text;
    //       });
    // */
    // //text on hover

    // let barTexts = chart.selectAll('.bar-text')
    //   .data(this.data)
    //   .enter()
    //   .append('text')
    //   .attr('class', 'bar-text')
    //   .attr('x', (d: any) => x(d.id) as number)
    //   .attr('y',  (d: any) => { return y(d.text) as number })
    //   .style("fill", fontColor)
    //   .style("font-size", fontSize)
    //   .style('font-weight', 'bold')
    //   .attr("text-anchor", textAnchor)
    //   .text((d: any) => d.text)
    //   .attr('cursor', 'default')
    //   .style('opacity', 0);

    // bars
    //   .on('mouseover', (event, d: any) => {
    //     barTexts.filter((_: any) => _ === d)
    //       .style('opacity', 1);
    //   })
    //   .on('mouseout', (event, d: any) => {
    //     barTexts.style('opacity', 0);
    //   });
  }
}
