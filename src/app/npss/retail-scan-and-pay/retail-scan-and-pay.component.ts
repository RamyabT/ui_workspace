import { Component, OnInit, Optional } from '@angular/core';
import { BaseFpxFormComponent } from '@fpx/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailScanAndPayHelper, RetailScanAndPayState } from './retail-scan-and-pay.helper';

@Component({
  selector: 'app-retail-scan-and-pay',
  templateUrl: './retail-scan-and-pay.component.html',
  styleUrls: ['./retail-scan-and-pay.component.scss'],
  providers: [RetailScanAndPayHelper]
})
export class RetailScanAndPayComponent extends BaseFpxFormComponent<RetailScanAndPayHelper, RetailScanAndPayState> {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public _retailScanAndPayService: RetailScanAndPayHelper,
  ) { 
    super(formBuilder, router,controlContainer, _retailScanAndPayService);
    
  }
  protected override doPreInit(): void {
    this.setServiceCode("RETAILSCANANDPAY");
  }

}
