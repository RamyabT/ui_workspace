import { Injectable } from "@angular/core";
import { DeviceDetectorService } from "@dep/core";
import { AppConfigService } from "@dep/services";
import { BaseFpxRoGridHelper, FpxCurrenyFormatterPipe, GridTransformFn, ToolBar } from "@fpx/core";
import { TranslateService } from "@ngx-translate/core";
import moment from "moment";

@Injectable()
export class UpcomingPaymentsDashbordRoGridHelper extends BaseFpxRoGridHelper {
    constructor(
        private _appConfig: AppConfigService,
        private _currencyFormatter: FpxCurrenyFormatterPipe,
        private _translateService: TranslateService,
        public device: DeviceDetectorService
    ) {
        super();
    }

    override getToolBar(): ToolBar[] {
        let toolBar: ToolBar[] = [];
        return toolBar;
    }
    override getSortSearch(): Map<string, "sort" | "search" | "sort&search" | undefined> {
        let _isSortSearch: Map<string, 'sort' | 'search' | 'sort&search' | undefined> = new Map();
        return _isSortSearch;
    }
    override getTransformMap(): Map<string, GridTransformFn<any>> {
        let transformMap: Map<string, GridTransformFn<any>> = new Map();
        return transformMap;
    }
    override getGridWidth(): number {
        return 100;
    }
    override getGridColumnWidth(): number[] {
        return [100];
    }
    
    override doPreInit(): void {
        if(!this.device.isMobile()){
            this.setNgTemplateName('upcomingBillTmplt');
            this.setNgTemplateClass('upcoming-bill-tmpl');
        }
        else{
            this.setNgTemplateName('upcomingPaymentsDashboardTmplt');
            this.setNgTemplateClass('upcoming-payments-dashboard-tmplt');
        }
    }

    override postFindallInterceptor = (payload: any) => {
        // if (this.initialGridLoad) {
        //     this.initialGridLoad = false
        //     this.triggerGridOutputEvent('UPCOMINGBILLDATA', payload)
        // }
        if (payload && payload?.data?.length > 0) {
            let tempPayload: any[] = [];
            payload.data.forEach((element: any) => {
                let dueDateStr = this.getMessage(element);
                let amount = element?.currency + " " + this._currencyFormatter.transform((element?.totalDueAmount || 0), element?.currency)
                tempPayload.push({ ...element, dueDateStr: dueDateStr, amount: amount })
            });
            payload.data = tempPayload;
        }
        // this.paymentsServices.upcomingBillData = payload;
        return payload;
    }

    getMessage(element: any): any {
        let dateStr:string = "";

        if (element?.dueDate && element?.dueDate !== '') {
            let duuDate = moment(element?.dueDate);
            let currentDte = moment(this._appConfig.getCBD())
            let days = moment(element?.dueDate).diff(currentDte, 'days');
            let isAfter = currentDte.isAfter(moment(element?.dueDate));
            let isBefore = currentDte.isBefore(moment(element?.dueDate));
            let issame = moment(element?.dueDate).isSame(currentDte);

            if (issame) {
                dateStr = this._translateService.instant('upcomingPaymentsDashboardTmplt.DUE_FOR_TODAY');
            }
            if (isAfter) {
                if (days < 7) {
                    dateStr = this._translateService.instant('upcomingPaymentsDashboardTmplt.DUE_EXPIRED', {days:Math.abs(days)});
                } else if (days > 7) {
                    dateStr = this._translateService.instant('upcomingPaymentsDashboardTmplt.DUE_EXPIRED', {days:""});
                }
            } else if (isBefore) {
                if (days < 7) {
                    dateStr = this._translateService.instant('upcomingPaymentsDashboardTmplt.DUE_IN', {days:Math.abs(days)});
                } else if (days === 7) {
                    dateStr = this._translateService.instant('upcomingPaymentsDashboardTmplt.DUE_IN', {days:"1w"});
                } else if (days > 7) {
                    dateStr = this._translateService.instant('upcomingPaymentsDashboardTmplt.DUE_DATE', {days:Math.abs(days)});
                }
            } else {
                dateStr = this._translateService.instant('upcomingPaymentsDashboardTmplt.DUE_TODAY');
            }
        } else {
            dateStr = "";
        }

        return dateStr;
    }

}