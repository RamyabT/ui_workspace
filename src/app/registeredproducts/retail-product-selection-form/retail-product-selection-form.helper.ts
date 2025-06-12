import { Inject, Injectable } from "@angular/core";
import {
  BaseFpxComponentState,
  BaseFpxFormHelper,
  CriteriaQuery,
  FpxSubmitHandler,
  RoutingInfo,
} from "@fpx/core";

import { Router } from "@angular/router";
import { AppConfigService } from "@dep/services";
import { RetailProductSelectionService } from "../retail-product-selection-service/retail-product-selection.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

export class RetailProductSelectionFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  formSubmitted: boolean = false;
  segments: any = [];
  activeSegmentIndex: number = 0;
  serviceCode: string = '';
  selectedProduct: any;
}

@Injectable()
export class RetailProductSelectionFormHelper extends BaseFpxFormHelper<RetailProductSelectionFormState> {
  segment: any;

  constructor(
    private _router: Router,
    private _productSelectionService: RetailProductSelectionService,
    private _appConfig: AppConfigService,
    private _dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,
  ) {
    super(new RetailProductSelectionFormState());
  }

  override doPreInit(): void {
    this.state.activeSegmentIndex = 0;
    
    let criteriaQuery = new CriteriaQuery();
    criteriaQuery.addFilterCritertia('tenantId', 'String', 'equals', {
      searchText: this._appConfig.getTenantId()
    });

    let searchText:string = "RP";
    if(this._appConfig.getData('contractType') == 'deposit') {
      searchText = "RPTD";
    }
    criteriaQuery.addFilterCritertia('productcategory', 'String', 'equals', {
      searchText: searchText
    });

    this._productSelectionService.getProductSegment(criteriaQuery).subscribe(
      (res) => {
        this.state.segments = res;
        if (this.state.segments) {
          this.formGroup.get('productSegment')?.patchValue(res?.[0].segmentCode);
          this.onClickSegment(0);
        }
      })
  }

  selectProduct(){
    this._dialogRef.close({
      serviceCode: this.state.serviceCode,
      productId: this.getValue('productId'),
      segmentId: this.segment,
      productDescription: this.state.selectedProduct.productDescription
    });
  }

  onProductSelect(selectedProduct:any){
    this.state.selectedProduct = selectedProduct;
  }

  onClickSegment(i: number) {
    this.state.activeSegmentIndex = i;
    if (this.state.segments) this.formGroup.get('productSegment')?.patchValue(this.state.segments?.[i].segmentCode)
    this.segment = this.formGroup.get('productSegment')?.value;
    const serviceCode = this.getServiceCode(this.segment);
    
    this.state.serviceCode = serviceCode;
  }

  private getServiceCode(segment: string){
    let serviceCode = '';
    if(this._appConfig.getData('contractType') == 'new') { // new | existing
      serviceCode = 'RETAILRPNC' + segment;
    } else if (this._appConfig.getData('contractType') == 'existing') {
      serviceCode = 'RETAILRPEC' + segment;
    } else if (this._appConfig.getData('contractType') == 'deposit') {
      serviceCode = 'RETAILRPEC' + segment;
    }
    return serviceCode;
  }

  onBackClick() {
    this._router.navigate(['welcome']);
  }

}
