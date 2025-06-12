// 1. Import Statements
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';
import {
	debounceTime,
	distinctUntilChanged,
	finalize,
	Observable,
	of,
	startWith,
	switchMap,
	tap,
} from 'rxjs';
import { ValidatorService } from '@fpx/core';
import { AppConfigService } from '@dep/services';
import { EtransferContactListTemplateControlHelper } from './etransfer-contact-list-template-control.helper';
import { EtransfercontactService } from '../etransfercontact-service/etransfercontact.service';
import { Etransfercontact } from '../etransfercontact-service/etransfercontact.model';


// 2. Component Selector
@Component({
	selector: 'app-etransfer-contact-list-template-control',
	templateUrl: './etransfer-contact-list-template-control.component.html',
	styleUrls: ['./etransfer-contact-list-template-control.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => EtransferContactListTemplateControlComponent),
			multi: true,
		},
		EtransferContactListTemplateControlHelper
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EtransferContactListTemplateControlComponent extends BaseFpxControlComponent {
	@Input('setDefault') setDefault: boolean = true;
	controlBusy: boolean = false;
	//4.  Constructor
	constructor(
		private controlContainer: ControlContainer,
		changeDetectorRef: ChangeDetectorRef,
		private _etransferContactService: EtransfercontactService,
		private _validatorService: ValidatorService,
		protected _accountListTemplateControlHelper: EtransferContactListTemplateControlHelper,
		private _appConfig: AppConfigService
	) {
		super(controlContainer, changeDetectorRef);
	}

	@Output() dataReceived: EventEmitter<any> = new EventEmitter<any | null>();
	// event methods
	override doPreInit(): void {
		if(this.dependencyField) this.addDependencies(this.dependencyField);
		// this.setHelper(this._accountListTemplateControlHelper);
		this.setNgTemplateName('etransferContactListTmplt');
		this.addPKList(['beneId']);
		this.addAsyncValidatorFn(this._validatorService.findByKeyUtility(this.commonControlEvent, this._etransferContactService, this.formControlName, this.attributesMap));
	}

	public override doPostInit(): void {
		let dependencyFieldsLen = this.dependencyField?.length || 0;
		if(dependencyFieldsLen == 0){
			this.controlBusy = true;
			this._etransferContactService.getEtransferContacts()().subscribe({
				next: (etransferContacts: Etransfercontact[]) => {

					etransferContacts.map((item) => item.id = item.beneId);
					
					this._appConfig.setData('etransferContactList', etransferContacts);
					this.setSelectableData(of(etransferContacts));
					// if (!this.formControl?.parent?.get(this.formControlName)?.value && etransferContacts.length == 1) {
					// 	setTimeout(() => {
					// 		this.formControl.setValue(etransferContacts[0].beneId, { emitEvent: true });
					// 	});
					// }
					// if (!this.formControl?.parent?.get(this.formControlName)?.value && this.setDefault) {
					// 	setTimeout(() => {
					// 		this.formControl.setValue(etransferContacts[0].beneId, { emitEvent: true });
					// 	});
					// }
					this.controlBusy = false;
				},
				error: (err) => {
				this.controlBusy = false;
					console.error("etransfer contacts fetch error");
				},
			});
		}
	}

	override doChangeNotify(subject: string, payload: any): void {
        let _contactId = payload.beneId;
        let _etransferContacts!: Etransfercontact[];
        if(this._appConfig.hasData('etransferContactList')){
            _etransferContacts = this._appConfig.getData('etransferContactList');
			_etransferContacts = _etransferContacts.filter((etransferContacts:Etransfercontact) => etransferContacts.beneId != _contactId);
			this.setSelectableData(of(_etransferContacts));
        } else {
			this._etransferContactService.getEtransferContacts()().subscribe({
				next: (etransferContacts: Etransfercontact[]) => {
					etransferContacts.map((item) => item.id = item.beneId);
					this.setSelectableData(of(etransferContacts));
				},
				error: (err) => {
					console.error("etransfer Contacts fetch error");
				},
			});
		}
	}
}