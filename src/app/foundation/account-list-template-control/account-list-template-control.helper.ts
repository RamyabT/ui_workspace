import { ChangeDetectorRef, Injectable } from '@angular/core';
import { BaseFpxControlHelper } from '@fpx/core';
import { Observable, of } from 'rxjs';
import { CasaaccountService } from '../casaaccount-service/casaaccount.service';
import { Casaaccount } from '../casaaccount-service/casaaccount.model';
import { AppConfigService } from '@dep/services';


@Injectable()
export class AccountListTemplateControlHelper extends BaseFpxControlHelper {
    selectableDataList$: any;
    casaAaccountList!: Casaaccount[];
    sourceAccount: string = '';

    constructor(
        private _casaAccountService: CasaaccountService,
        private cd: ChangeDetectorRef,
        private _appConfig: AppConfigService
    ) {
        super();
    }

    override doPreInit(): void {}
    public override doPostInit(): void { }

}