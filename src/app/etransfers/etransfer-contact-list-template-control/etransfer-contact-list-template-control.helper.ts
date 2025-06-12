import { ChangeDetectorRef, Injectable } from '@angular/core';
import { BaseFpxControlHelper } from '@fpx/core';
import { Observable, of } from 'rxjs';
import { AppConfigService } from '@dep/services';
import { Etransfercontact } from '../etransfercontact-service/etransfercontact.model';
import { EtransfercontactService } from '../etransfercontact-service/etransfercontact.service';


@Injectable()
export class EtransferContactListTemplateControlHelper extends BaseFpxControlHelper {
    selectableDataList$: any;
    etransfercontactList!: Etransfercontact[];
    sourceAccount: string = '';

    constructor(
        private _casaAccountService: EtransfercontactService,
        private cd: ChangeDetectorRef,
        private _appConfig: AppConfigService
    ) {
        super();
    }

    override doPreInit(): void {}
    public override doPostInit(): void { }

}