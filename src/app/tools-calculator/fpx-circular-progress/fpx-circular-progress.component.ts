import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import * as d3 from 'd3';
import { BaseFpxChartComponent, BaseFpxChartHelper } from '../base-fpx-charts/base-fpx-charts.component';
import { CHARTS } from '../base-fpx-charts/charts.token';

@Component({
  selector: 'fpx-circular-progress',
  templateUrl: './fpx-circular-progress.component.html',
  styleUrls: ['./fpx-circular-progress.component.scss'],
  providers: [
    {
      provide: CHARTS,
      useExisting: FpxCircularProgressComponent
    }
  ]
})
export class FpxCircularProgressComponent extends BaseFpxChartComponent<BaseFpxChartHelper> {

  @Input() idvalue: any = 'id';
  @Input() textvalue: any = 'text';
  @Input() additionalData : any = 'additionalData';

  constructor(private elementRef: ElementRef) {
    super();
  }

  override getCallChartData() {
    let thisme: any = this;

    let chartData: any = [];
    this.data.map((_: any) => {
      let dataSegment: any = {
        id: _[this.idvalue],
        text: _[this.textvalue],
        additionalData: _[this.additionalData]
      }
      chartData.push(dataSegment);
    })

    this.data = chartData;

    if (this.data.length > 0) {

      setTimeout(function () {
        thisme.createSvg();
      }, 500);
    }
  }

  override doChanges() {
    // this.getCallChartData();
  }


  createSvg(): void {

    const barRadius = this.chartConfigurations.barRadius;
    let sorting = this.chartConfigurations.sorting;
    const padAngle = this.chartConfigurations.padAngle;
    const fontSize = this.chartConfigurations.fontSize;
    const fontColor = this.chartConfigurations.fontColor;
    const circularChartBackgroundColor = this.chartConfigurations.circularChartBackgroundColor;

    const margin: any = {
      top: this.chartConfigurations.marginTop,
      right: this.chartConfigurations.marginRight,
      left: this.chartConfigurations.marginLeft,
      bottom: this.chartConfigurations.marginBottom
    },

      svgWidth = this.chartConfigurations.svgWidth,
      svgHeight = this.chartConfigurations.svgHeight,


      width = this.chartConfigurations.svgWidth - margin.left - margin.right,
      height = this.chartConfigurations.svgHeight - margin.top - margin.bottom;

    let colors: any = ["red", "green", "brown", "blue"];

    const tau = 2 * Math.PI;
    let outerRadius = height / 3;
    let innerRadius = outerRadius * 0.87;
    const radius = Math.min(svgWidth, svgHeight) / 2;

    const color = d3.scaleOrdinal(this.chartConfigurations._colors || colors);

    const svg = d3
      .select(this.elementRef.nativeElement)
      .append('svg')
      .attr('width', svgWidth)
      .attr('height', svgHeight);

    let dataList = this.data

    for (let obj of dataList) {

      const g = svg
        .append('g')
        .attr('transform', `translate(${svgWidth / 2},${svgHeight / 2})`)

      const path = d3
        .arc<any>()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .startAngle(0)
        .cornerRadius(barRadius)

      innerRadius = innerRadius - 20;
      outerRadius = outerRadius - 20;

      const background = g.append("path")
        .datum({ endAngle: tau })
        .style("fill", circularChartBackgroundColor)
        .attr("d", path);

      const foreground = g
        .append("path")
        .datum({ endAngle: 0 })
        .attr('fill', color(obj.id) as string)
        .attr("d", path);

      let textOnHover = g
        .append('text')
        .attr('class', 'texts')
        .attr('dy', '0.35em')
        .style('text-anchor', 'middle')
        .style("fill", fontColor)
        .style("font-size", fontSize)
        .style('font-weight', 'bold')
        // .text(obj.text + " " +obj.id)
        .attr('cursor', 'default')
        .style('opacity', 1);

      const lines = [obj.id,obj.additionalData]; 

      lines.forEach((line, index) => {
        textOnHover
          .append('tspan')
          .attr('x', 0)
          .attr('dy', `${index === 0 ? 0 : 1.2}em`) 
          .text(line);
      });

      // g.on('mouseover', () => {
      //   textOnHover
      //     .style('opacity', 1);
      // })
      //   .on('mouseout', () => {
      //     textOnHover.style('opacity', 0);
      //   });
      foreground.transition()
        .duration(1000)
        .call(arcTween, obj.text * tau / 100);

      function arcTween(transition: any, newAngle: any) {
        transition.attrTween("d", function (d: any) {
          var interpolate = d3.interpolate(d.endAngle, newAngle);
          return function (t: any) {
            d.endAngle = interpolate(t);
            return path(d);
          };
        });
      }
    }

  }
}
