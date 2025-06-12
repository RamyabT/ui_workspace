import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { DeviceDetectorService } from '@dep/core';
import { AppConfigService } from '@dep/services';
import * as d3 from 'd3';
import moment from 'moment';

@Component({
  selector: 'app-debitcard-spending-summary',
  templateUrl: './debitcard-spending-summary.component.html',
  styleUrls: ['./debitcard-spending-summary.component.scss']
})
export class DebitcardSpendingSummaryComponent implements OnInit {
  @ViewChild('chartContainer', { read: ElementRef }) chartContainer!: ElementRef;
  protected appConfig: AppConfigService = inject(AppConfigService);
	@Output() spendDate:EventEmitter <any> = new EventEmitter<  any|null>();
  private _chartData: any = [];
  totalSummary: number = 0;
  prevDisable: boolean = false;
  nextDisable: boolean = false;
  @Input() set chartData(_data:any[]){
    this._chartData = _data;
    console.log('chartData', _data);
    this.getTotalSummaryValue();
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

  colorsArray: string[] = ["#B6C8CB", "#00BD9B", "#FF4800", "#FFA100", "#005F8F"];

  currentDate = 0;
  currentSpendDate: any = moment();
  constructor(private cd: ChangeDetectorRef,
    public _device: DeviceDetectorService) { }

  ngOnInit(): void {  
    this.checkButtonState();
  }

  getPreviousSpendDetails() {
    this.currentSpendDate = moment().add(--this.currentDate, 'months');
    this.checkButtonState();
  }

  getNextSpendDetails() {
    this.currentSpendDate = moment().add(++this.currentDate, 'months');
    this.checkButtonState();
  }

  checkButtonState() {
    this.prevDisable = moment().diff(this.currentSpendDate, 'months') > 4? true: false;
    this.nextDisable = moment().diff(this.currentSpendDate, 'months') < 1? true: false;
    this.spendDate.emit(this.currentSpendDate);
    this.cd.detectChanges();
  }

  ngAfterViewInit() {
    let w = this.chartContainer.nativeElement.getClientRects()[0].width;
    this.width = w;
    this.height = 270;
    this.radius = Math.min(this.width, this.height) / 2;
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
      .innerRadius(95)
      .outerRadius(this.radius - 5);
    }
    else {
      this.arc = d3.arc()
      .innerRadius(75)
      .outerRadius(this.radius - 30);
    }
    
  }

  updateChart(){
    this.domains = this._chartData.map((obj: any) => obj.category);
    let color = d3.scaleOrdinal()
      .domain(this.domains)
      .range(this.colorsArray.slice(0,this.domains.length));

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
      .attr("xlink:href", (d:any) => { return "./assets/spend-category/" + d.data.category + ".svg"})
      .attr("transform", (d:any) => { return "translate(" + this.arc.centroid(d) + ")" })
      .attr('x', -10) 
      .attr('y', -10);
  }
 getTotalSummaryValue(){
  this.totalSummary = 0;
  this._chartData.forEach((element: any) => {
    this.totalSummary += parseInt(element.value);
  });
 }
  
}
