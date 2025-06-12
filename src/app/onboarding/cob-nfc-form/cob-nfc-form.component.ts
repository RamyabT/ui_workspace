import { Component, EventEmitter, Optional, NgZone } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CobNfcFormHelper, CobNfcFormState } from './cob-nfc-form.helper';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { NfcService } from '../nfc-service/nfc.service';
import { Nfc } from '../nfc-service/nfc.model';
import { PhotoIdMatchService } from '../photoidmatch-service/photoidmatch.service';
import { FacetechReqServcie } from '../facetecreq-service/facetechreq.servcie';
import { Device } from '@ionic-native/device/ngx';

declare let nfc: any;
declare let cardDetails: any;
declare let document: any;

@Component({
  selector: 'app-cob-nfc-form',
  templateUrl: './cob-nfc-form.component.html',
  styleUrls: ['./cob-nfc-form.component.scss'],
  providers: [CobNfcFormHelper]
})

export class CobNfcFormComponent extends BaseFpxFormComponent<CobNfcFormHelper, CobNfcFormState> {
  nfcScancompleted: boolean = false;
  nfcScannotcompleted: boolean = true;
  scanId: boolean = true;

  skipId: boolean = false;
  proceedId: boolean = true;
  count: any;
  status: any;
  dob: any;
  constructor(
    private ngZone: NgZone,
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public cobNfcFormHelper: CobNfcFormHelper,
    public nfcService: NfcService,
    private validatorService: ValidatorService,
    private facetechReqServcie: FacetechReqServcie,
    private photoIdMatchService: PhotoIdMatchService,
    private device: Device

  ) {
    super(formBuilder, router, controlContainer, cobNfcFormHelper);
  }
  protected override doPreInit(): void {
    this.addFormControl('applicantId', '', [],
      [
        this.validatorService.dataAvailabilityCheck(
          this.embadedFormMode,
          'applicantId',
          this.nfcService,
          this.dataAvailable$
        ),
      ], 'blur', 0, true, 0);
    this.setDataService(this.nfcService);
    this.setServiceCode("RETAILCOBNFC");

  }


  protected override doPostInit(): void {

  }

  proceed() {


    this.scanId = false;

    this.count = this.photoIdMatchService.nfcCount--;
    console.log("this.count", this.count);

    var that = this;

    if (this.device.platform.toLowerCase() == 'ios') {
      nfc.beginSession(successCallbacki2, errorCallbacki2);

      function successCallbacki2(result: any) {
        
        var cardDetails = {
          cardNo: that.photoIdMatchService.cardNo,
          dob: that.photoIdMatchService.dobEid,
          expiryDate: that.photoIdMatchService.dateOfExpiration
        }
        nfc.tap(cardDetails, successCallback, errorCallback);
        function successCallback(result: any) {
          
          console.log(result);
          that.ngZone.run(() => {
            that.photoIdMatchService.resultDetails = result;
            that.nfcScannotcompleted = false;
            that.nfcScancompleted = true;

          });
          //   document.getElementById("result").value = result.idType+" "+result.fullName+" "+result.gender+result.nationality+" "+result.arabicName;
          //   document.getElementById("result").value = result;
        }
        function errorCallback(result: any) {
          console.log(result);
        }
      }
      function errorCallbacki2(result: any) {
        console.log(result);
      }

      
    } else {
      nfc.addNdefListener(callback2, successCallback2, errorCallback2);
      
      that.status = that.photoIdMatchService.status = "Scanning inprogress"

      function callback2(result: any) {
        console.log("callback2: " + result);

      }

      function successCallback2(result: any) {
        var cardDetails = {
          // cardNo: "122783711",
          // dob: "10/12/1990",
          // expiryDate: "14/06/2024"
          cardNo: that.photoIdMatchService.cardNo,
          dob: that.photoIdMatchService.dobEid,
          expiryDate: that.photoIdMatchService.dateOfExpiration
        }
        nfc.tap(cardDetails, successCallback, errorCallback);
        function successCallback(obj: any) {
          console.log("successCallback2: " + obj.Result);
           that.photoIdMatchService.resultDetails = obj.Result;

          that.ngZone.run(() => {
            that.nfcScannotcompleted = false;
            that.nfcScancompleted = true;

          });
        }
        function errorCallback(result: any) {
          console.log("errorCallback: " + result);
          that.scanId = false;

          if (that.count > 0) {

            that.skipId = false;
            that.scanId = false;
            that.ngZone.run(() => {
              that.status = that.photoIdMatchService.status = "Scanning Failed please try again!"
              that.proceedId = true;
            });
          } else {
            that.scanId = false;
            that.skipId = true;
            that.proceedId = false;
            that.ngZone.run(() => {
              that.status = that.photoIdMatchService.status = "Scanning Failed please try again later!"

            });
          }
        }
      }
    }
    function errorCallback2(result: any) {
      console.log("errorCallback2: " + result);
      if (that.count > 0) {
        that.skipId = false;
        that.scanId = false;
        that.ngZone.run(() => {
          that.status = that.photoIdMatchService.status = "Scanning Failed please try again!"
          that.proceedId = true;
        });

        //that.photoIdMatchService.resultDetails = "Lorem There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.";

      } else {
        that.scanId = false;
        that.skipId = true;

        that.ngZone.run(() => {
          that.status = that.photoIdMatchService.status = "Scanning Failed please try again later!"
          that.proceedId = false;
        });
      }
    }
  }
}
