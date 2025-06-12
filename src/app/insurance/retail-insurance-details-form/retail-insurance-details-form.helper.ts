import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { HttpProviderService, BaseFpxComponentState, BaseFpxFormHelper, FpxModal, FpxModalAfterClosed } from "@fpx/core";
import { AccountsService } from "src/app/foundation/validator-service/accounts.service";
import { InsurancesummaryService } from "../insurance-summary-service/insurancesummary.service";
import { insurance } from "../insurance-summary-service/insurancesummary.model";
import { ActiveSpaceInfoService, DeviceDetectorService } from "@dep/core";
import { AppConfigService } from "@dep/services";
import { FileOpenerService } from "@dep/native";
import { DepAlertComponent } from "src/app/dep/core/component/dep-alert/dep-alert.component";

export const travelFields: string[] = ["destinationCountry", "depatureDate", "returnDate", "purposeOfTrip"];
export const travelFieldsFormat: string[] = ["text", "date", "date", "text"];

export const vehicleFields: string[] = [
    "vehicleType", "makeAndModel", "yearOfManufacture", "vihicleIdentificationNumber",
    "registrationNumber", "dateOfRegistration", "engineNumber", "chassisNumber",
    "fuelType", "engineCapacity", "seatingCapacity", "drivingLicenceNumber", "dateOfLicenseNumber"
];
export const vehicleFieldsFormat: string[] = [
    "text", "text", "text", "text", "text", "date", "text", "text", "text", "text", "text", "text", "date"
];

export const homeFields: string[] = ["homeAddress", "noOfFloors", "yearBuilt", "squreFootage", "noOfBedRooms", "ownerShipStatus"];
export const homeFieldsFormat: string[] = ["text", "text", "text", "text", "text", "text"];

export class RetailInsuranceDetailsFormState extends BaseFpxComponentState {
    showSuggestion: boolean = false;
    details: any;
    hasLocData: boolean = false;
    adressInfo: any;

    fields: string[] = [
        "applicantName","firstName", "productTypeDesc", "productType", "premiumAmount", "policyNumber",
        "dueDate", "startDate", "payDuration", "insuredAmount", "PolicyStatus", "bonusAmount",
        "maturityDate", "policyDuration", "status"
    ];

    fieldsFormat: string[] = [
        "text","text","text", "text", "text", "text", "date", "date",
        "text", "amount", "text", "amount", "date", "text", "text"
    ];
}

@Injectable()
export class RetailInsuranceDetailsFormHelper extends BaseFpxFormHelper<RetailInsuranceDetailsFormState> {
    private insuranceProductType: string = 'home';
    result: any;
    accountNumber: string = "";

    constructor(
        private _httpProvider: HttpProviderService,
        private _router: Router,
        private _accountsService: AccountsService,
        private _insuranceSummaryService: InsurancesummaryService,
        private _activeSpaceInfoService: ActiveSpaceInfoService,
        private _fileOpener: FileOpenerService,
        private route: ActivatedRoute,
        private _translate: TranslateService,
        private _appConfig: AppConfigService,
        public device: DeviceDetectorService
    ) {
        super(new RetailInsuranceDetailsFormState());
        route.queryParams.subscribe((params: any) => {
            if (params && params.rid) this.handleFormOnLoad();
        });
    }

    override doPreInit() {
        this.setServiceCode('RETAILINSURANCEDETAILS');
        this.removeShellBtn("BACK");
        this.addShellButton('downloadInsuranceDetails.downloadDetail', 'DOWNLOAD', 'primary', 'DISPLAY', 'button');
        this.setShellBtnMethod('DOWNLOAD', this.onDownloadInsuranceDetailsClick.bind(this));
    }

    public override doPostInit(): void {
        this.setSelectedInsurance();
        this.handleFormOnLoad();
    }

    public handleFormOnLoad() {
        this.accountNumber = this.getRoutingParam("insuranceId") || this._appConfig.getData("insuranceId");
        const keys: any = { insuranceId: this.accountNumber };
        this.insuranceDetails(keys);
    }

    public setSelectedInsurance() {
        if (this._appConfig.hasData('insuranceActionPublisher$')) {
            this._appConfig.getData('insuranceActionPublisher$').observable.subscribe((res: any) => {
                if (res?.action === 'REFRESHCONTAINER') {
                    this.insuranceProductType = res.insuranceProductType;
                    const keys: any = { insuranceId: res?.data.insuranceId };
                    this.insuranceDetails(keys);
                }
            });
        }
    }

    public insuranceDetails(data: any) {
        this._insuranceSummaryService.findByKey(data)().subscribe({
            next: (res) => {
                const d = res as insurance;
                this.state.details = d;
                this.state.details.premiumAmount = d.premiumAmount+" "+d.currency;
                const commonFields = [
                    "applicantName","firstName","productTypeDesc", "productType", "premiumAmount",
                    "policyNumber", "dueDate", "startDate", "payDuration", "insuredAmount", "PolicyStatus",
                    "bonusAmount", "maturityDate", "policyDuration", "status"
                ];
                const commonFieldsFormat = [
                    "text","text","text", "text", "text", "text", "date", "date",
                    "text", "amount", "text", "amount", "date", "text", "text"
                ];
                this.state.fields = [...commonFields];
                this.state.fieldsFormat = [...commonFieldsFormat];
                const productType = d.productType;
                if (productType === "Vehicle" && d.vehicleInsurance) {
                    Object.assign(this.state.details, d.vehicleInsurance);
                    this.state.fields.push(...vehicleFields);
                    this.state.fieldsFormat.push(...vehicleFieldsFormat);
                }

                if (productType === "Travel" && d.travelInsurance) {
                    Object.assign(this.state.details, d.travelInsurance);
                    this.state.fields.push(...travelFields);
                    this.state.fieldsFormat.push(...travelFieldsFormat);
                }

                if (productType === "Home" && d.homeInsurance) {
                    Object.assign(this.state.details, d.homeInsurance);
                    this.state.fields.push(...homeFields);
                    this.state.fieldsFormat.push(...homeFieldsFormat);
                }
            },
            error: (error) => {
                if (error.status === '500') {
                    const titleMsg = this._translate.instant('DEFAULT.dataErr');
                    const errMsg = this._translate.instant('DEFAULT.dataErrMsg');

                    const fpxModal = new FpxModal();
                    fpxModal.setComponent(DepAlertComponent);
                    fpxModal.setDisableClose(false);
                    fpxModal.setPanelClass('dep-alert-popup');
                    fpxModal.setBackDropClass('dep-popup-back-drop');
                    fpxModal.setData({ title: titleMsg, message: errMsg });
                    fpxModal.setAfterClosed(this.MenuClose);
                    this.openModal(fpxModal);
                }
            }
        });
    }

    onDownloadInsuranceDetailsClick() {
        this._accountsService.downloadAccountDetails(this.accountNumber).subscribe({
            next: (response: any) => {
                if (this.device.isHybrid()) {
                    this._fileOpener.openPDF(response);
                } else {
                    const documentURL = URL.createObjectURL(new Blob([response.body], { type: "application/pdf" }));
                    const downloadLink = document.createElement("a");
                    downloadLink.href = documentURL;
                    downloadLink.download = "accountDetails.pdf";
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                }
            }
        });
    }

    MenuClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
        setTimeout(() => {
            if (this.device.isMobile()) {
                this._router.navigate(['/home']);
            } else {
                if (this._appConfig.hasData('moduleRefresh$')) {
                    this._appConfig.getData('moduleRefresh$').subject.next({
                        action: 'INSURANCEQUICKACTION',
                        data: { serviceCode: null }
                    });
                }
                this._router.navigate(['insurance-space/insurance']);
            }
        });
    }

    //$START_CUSTOMSCRIPT
    //$END_CUSTOMSCRIPT
}
