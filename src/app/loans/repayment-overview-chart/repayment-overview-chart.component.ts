import { Component, ElementRef, Input, OnInit, ViewChild, inject } from '@angular/core';
import { DeviceDetectorService } from '@dep/core';
import { AppConfigService } from '@dep/services';
import * as d3 from 'd3';

@Component({
  selector: 'app-repayment-overview-chart',
  templateUrl: './repayment-overview-chart.component.html',
  styleUrls: ['./repayment-overview-chart.component.scss']
})
export class RepaymentOverviewChartComponent implements OnInit {
  @ViewChild('chartContainer', { read: ElementRef }) chartContainer!: ElementRef;
  protected appConfig: AppConfigService = inject(AppConfigService);

  @Input('totalSummary') totalSummary: any;
  private _chartData: any = {};
  @Input() set chartData(_data:any){
    this._chartData = _data;
    console.log('chartData', _data);
    setTimeout(()=>{this.updateChart()});
  }
  get chartData(){
    return this._chartData;
  }

  data: any = [];
  chart: any;
  svg: any;
  arc: any;
  transition: any;
  width: number = 0;
  height: number = 0;
  margin: any = { top: 0, bottom: 0, left: 0, right: 0 };
  radius: number = 0;
  domains: any;

  colorsArray: string[] = ["#FF8926", "#FFD7B6"];

  constructor(private _device: DeviceDetectorService) { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    let w = this.chartContainer.nativeElement.getClientRects()[0].width;
    this.width = w;
    this.height = this._device.isMobile()?198:230;
    this.radius = Math.min(this.width, this.height-50) / 2;
    this.domains = this.data.map((obj: any) => obj.category);

    this.transition = d3.transition().duration(1000);

    this.svg = d3.select(this.chartContainer.nativeElement)
      .append('svg')
      .attr('class', 'spending-summmary-chart')
      .attr('width', this.width)
      .attr('height', this.height);

    this.chart = this.svg
      .append('g')
      .attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")");

      if(this._device.isMobile()) {
        this.arc = d3.arc()
        .innerRadius(90)
        .outerRadius(this.radius - 5);
      }
      else {
        this.arc = d3.arc()
      .innerRadius(110)
      .outerRadius(this.radius - 5);
      }
    
  }

  updateChart(){
    this.domains = this._chartData.map((obj: any) => obj.category);
    let color = d3.scaleOrdinal()
      .domain(this.domains)
      .range(this.colorsArray);

    let pie = d3.pie()
      .value((d: any) => { return d.value; });

    let data_ready = pie(this._chartData);

    this.chart.selectAll('.arc').remove();

    let g = this.chart
      .selectAll('.arc')
      .data(data_ready)
      .enter()
      .append('g')
      .attr('class', (d:any) => 'arc ' + d.data.category);

    let path = g.append('path')
      .attr('d', this.arc)
      .attr('fill', (d: any) => { return (color(d.data.category)) });

    g.append('image')
      .attr("class", "category-img")
      // .attr("xlink:hr ef", (d:any) => { return "./assets/spend-category/" + d.data.category + ".svg"})
      .attr("transform", (d:any) => { return "translate(" + this.arc.centroid(d) + ")" })
      .attr('x', -10) 
      .attr('y', -10);
  }

}
