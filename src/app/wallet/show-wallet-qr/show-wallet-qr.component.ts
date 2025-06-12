import { Component, ElementRef, Optional, ViewChild, forwardRef } from '@angular/core';
import { FormBuilder, ControlContainer, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailShowWalletQrState, RetailShowWalletQrHelper } from './show-wallet-qr.helper';
import { BaseFpxFormComponent } from '@fpx/core';


@Component({
  selector: 'app-show-wallet-qr',
  templateUrl: './show-wallet-qr.component.html',
  styleUrls: ['./show-wallet-qr.component.scss'],
  providers: [RetailShowWalletQrHelper,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => RetailShowWalletQrComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => RetailShowWalletQrComponent)
    }]
})

export class RetailShowWalletQrComponent extends BaseFpxFormComponent<RetailShowWalletQrHelper, RetailShowWalletQrState> {
  @ViewChild('qrCode') qrCodeElement!: ElementRef;
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailShowWalletQrHelper: RetailShowWalletQrHelper,
  ) {
    super(formBuilder, router, controlContainer, retailShowWalletQrHelper);
  }
  protected override doPreInit(): void {
    this.setServiceCode("RETAILSHOWWALLETQR");
  }


  protected override doPostInit(): void {
    this.state.qrCodeElement = this.qrCodeElement;
  }

}

