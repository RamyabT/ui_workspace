import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import * as d3 from 'd3';
import { CHARTS } from '../base-fpx-charts/charts.token';
import { BaseFpxChartComponent, BaseFpxChartHelper } from '../base-fpx-charts/base-fpx-charts.component';
import { AppConfigService } from '@dep/services';
import { FpxCurrenyFormatterPipe } from '@fpx/core';


@Component({
  selector: 'fpx-donut-chart',
  templateUrl: './fpx-donut-chart.component.html',
  styleUrls: ['./fpx-donut-chart.component.scss'],
  providers: [
    {
      provide: CHARTS,
      useExisting: FpxDonutChartComponent,
    },
  ],
})
export class FpxDonutChartComponent
  extends BaseFpxChartComponent<BaseFpxChartHelper>
  implements OnChanges {
  @Input() idvalue: any = 'id';
  @Input() textvalue: any = 'text';
  totalValue: any = 0;
  @Input() showTooltip: boolean = true;
  @Input() tooltipContent: any;
  @Output () arcClickEvent: EventEmitter<any> = new EventEmitter<any>;
  completeChartData: any;

  constructor(private elementRef: ElementRef,private _appConfig:AppConfigService,
      private _currencyFormatter:FpxCurrenyFormatterPipe
  ) {
    super();
  }

  override getCallChartData() {
    let chartData: any = [];
    this.totalValue = this.data?.reduce(
      (acc: any, curr: any) => acc + Number(curr[this.textvalue]),
      0
    );
    let baseCurrency:any =this._appConfig.getBaseCurrency();
    let percentageData = this.data?.map(
      (item: { [K: string]: string }, n: number) => {
        return Math.round((Number(item[this.textvalue]) / this.totalValue) * 100);
      }
    );
    this.totalValue=this._currencyFormatter.transform(this.totalValue,baseCurrency);

    this.data?.map((_: any, i: number) => {
      let dataSegment: any = {
        id: _[this.idvalue],
        icon:_['icon'],
        text: percentageData[i]
      };
      chartData.push(dataSegment);
    });
    this.completeChartData=this.data;
    this.data = chartData;
    if(this.totalValue=='0.00' && this.data.length > 0){
      this.data[0].text='100';
      this.chartConfigurations._colors=['#CCC'];
      this.showTooltip=false;
    }

    if (this.data.length > 0) {
      setTimeout(() => {
        this.createSvg();
      }, 500);
    }
  }

  createSvg(): void {
    const barRadius = this.chartConfigurations.barRadius;
    let sorting = this.chartConfigurations.sorting;
    const padAngle = this.chartConfigurations.padAngle;
    const outerRadius = this.chartConfigurations.outerRadius;
    const fontSize = this.chartConfigurations.fontSize;
    const fontColor = this.chartConfigurations.fontColor;
    const innerText = this._appConfig.getBaseCurrency();

    const margin: any = {
      top: this.chartConfigurations.marginTop,
      right: this.chartConfigurations.marginRight,
      left: this.chartConfigurations.marginLeft,
      bottom: this.chartConfigurations.marginBottom,
    },
      svgWidth = this.chartConfigurations.svgWidth,
      svgHeight = this.chartConfigurations.svgHeight,
      width = this.chartConfigurations.svgWidth - margin.left - margin.right,
      height = this.chartConfigurations.svgHeight - margin.top - margin.bottom;

    let colors: any = ['red', 'green', 'brown', 'blue'];

    const radius = Math.min(width, height) / 2;

    const color = d3.scaleOrdinal(this.chartConfigurations._colors || colors);

    const svg = d3
      .select(this.elementRef.nativeElement)
      .append('svg')
      .attr('width', svgWidth)
      .attr('height', svgHeight);

    const g = svg
      .append('g')
      .attr('transform', `translate(${svgWidth / 2},${svgHeight / 2})`);

    const pie = d3
      .pie<any>()
      .padAngle(padAngle / radius)
      .sort(null)
      .value((d:any) => d.text);

    const path = d3
      .arc<any>()
      .cornerRadius(barRadius)
      .outerRadius(radius - outerRadius)
      .innerRadius(radius - 10);

    const arc = g
      .selectAll('.arc')
      .data(pie(this.data))
      .enter()
      .append('g')
      .attr('class', 'arc')
      .on("click", this.chartClick.bind(this));

    arc
      .append('path')
      .attr('d', path as any)
      .attr('fill', (d: any, i: number) => {
        this.legends[i] = {
          id: d.data.text,
          color: color(d.data.id) as string,
          text: d.data.id,
        };
        return color(d.data.id) as string;
      });

    arc
      .append("svg:image")
      .attr("xlink:href", (d) => d.data.icon)
      .attr("x", -12)
      .attr("y", -12)   //Move the text from the start angle of the arc
      // .attr("dy", 18) //Move the text down
      .attr("transform", (d) => {
        return `translate(${path.centroid(d)})  `
      })

    const labelLocation = d3
      .arc()
      .innerRadius(radius - 10)
      .outerRadius(radius - outerRadius);

    if (this.showTooltip) {
      var tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("text-align", "center")
        .style("width", "auto")
        .style("height", "auto")

        .style("padding", "5px")
        .style("font", "12px sans-serif")
        .style("background", "lightsteelblue")
        .style("border", "0px")
        .style("border-radius", "8px")
        .style("pointer-events", "none")
        .style("opacity", 0);

      arc
        .on('mouseover', (event, d: any) => {
          if (this.showTooltip) {
            tooltip.transition().duration(200).style("opacity", 0.9);
            if (this.tooltipContent == this.idvalue) {
              tooltip.html(d.data.id);
            } else {
              tooltip.html(d.data.text);
            }
            tooltip
              .style("left", event.pageX + "px")
              .style("top", event.pageY - 28 + "px");
          }
        })
        .on('mouseout', (event, d: any) => {
          if (this.showTooltip) {
            tooltip.transition().duration(500).style("opacity", 0);
          }
        });
    }

    const innerTextLocation = { x: 0, y: 25 };
    const innerTitleLocation = { x: 0, y: -25 };


    let Text = g
    .append('text')
      .attr('class', 'totalLabel')
      .style('fill','#565656')
      .attr('dy', '0.35em')
      .style('text-anchor', 'middle')
      .attr(
        'transform',
        `translate(${innerTextLocation.x},${innerTextLocation.y})`
      )
      .text(innerText)
      .attr('cursor', 'default')
      .style('opacity', 1);

    g.append('text')
    .attr('class', 'totalTitle')
    .style('fill','#565656')
    .attr('dy', '0.35em')
    .style('text-anchor', 'middle')
    .attr(
      'transform',
      `translate(${innerTitleLocation.x},${innerTitleLocation.y})`
    )
    .text('Total Expenses')
    .attr('cursor', 'default')
    .style('opacity', 1);

    g.append('text')
      .attr('class', 'totalValue')
      .style('fill','#565656')
      .attr('dy', '0.35em')
      .style('text-anchor', 'middle')
      .style('font-size', '28px')
      .style('font-weight', '800')
      .text(this.totalValue)
      .attr('cursor', 'default')
      .style('opacity', 1);
    
    
  }
  chartClick(event:any) {
    let id:any=event.srcElement.__data__.data.id;
    let arcData:any=this.completeChartData.find((x:any)=>x[this.idvalue]==id);
    this.arcClickEvent.emit({arcData:arcData});
  }
}
