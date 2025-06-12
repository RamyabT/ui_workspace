import { ChangeDetectorRef, Injectable } from '@angular/core';
import { BaseFpxControlHelper } from '@fpx/core';
import { Observable, of } from 'rxjs';
import { AppConfigService } from '@dep/services';
import { Loans } from 'src/app/loans/loans-service/loans.model';
import { LoansService } from 'src/app/loans/loans-service/loans.service';


@Injectable()
export class HomeLoanAccountListTemplateControlHelper extends BaseFpxControlHelper {
    selectableDataList$: any;
    loanAccountList!: Loans[];
    sourceAccount: string = '';

    constructor(
        private _loansService: LoansService,
        private cd: ChangeDetectorRef,
        private _appConfig: AppConfigService
    ) {
        super();
    }

    override doPreInit(): void {}
    public override doPostInit(): void { }

}