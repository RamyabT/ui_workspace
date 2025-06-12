import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { APPCONSTANTS } from '@dep/constants';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import { AppConfigService } from '@dep/services';
import { BillPaymentsService } from 'src/app/foundation/validator-service/billpayments.service';

@Component({
  selector: 'app-payments-home',
  templateUrl: './payments-home.component.html',
  styleUrls: ['./payments-home.component.scss']
})
export class PaymentsHomeComponent implements OnInit , AfterViewInit {
  private _activeSpaceInfoService: ActiveSpaceInfoService = inject(ActiveSpaceInfoService);
  private tabs = ['casa', 'deposit', 'loan'];
  protected activeTabIndex: number = 0;
  protected appConstant: any = APPCONSTANTS;
  upcomingloader:boolean = true;
  upcomingData:any[] = [];
  billhistoryloader:boolean = true;
  billHistoryData:any[] = [];

  savedBillerloader:boolean = true;
  savedBillerData:any[] = [];
  

  constructor(private _router: Router,
    private _deviceDetectorService:DeviceDetectorService,
    private _billPaymentsService:BillPaymentsService,
    private _appConfig: AppConfigService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if(!this._deviceDetectorService.isMobile()){
      this._billPaymentsService.billpaymentsDesktopActionPublisher?.next({action:'QUICKACTION',data:{serviceCode:'HOME'}})
  }  }

  onTabChanged($event:any){
    // let module = this.tabs[$event.index];
    // this._activeSpaceInfoService.setModule(module as any);
  }

  handleUpcomingBillGridEvent(payload:any){
    this.upcomingloader = false;
    this.upcomingData = payload?.payload?.data || [];

  }

  navToAddBiller(){
    let sertvice = this._appConfig.getServiceDetails('RETAILCATEGORYGROUPBILLER');
    this._router.navigate(sertvice.servicePath, {
      queryParams: {
        serviceCode: 'RETAILCATEGORYGROUPBILLER' 
      }
    });
  }

  handleBillHistoryGridEvent(payload:any){
    this.billhistoryloader = false;
    this.billHistoryData = payload?.payload?.data || [];

  }

}
