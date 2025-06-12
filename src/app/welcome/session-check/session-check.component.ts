import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppConfigService } from '@dep/services';
import { Casaaccount } from 'src/app/foundation/casaaccount-service/casaaccount.model';

@Component({
  selector: 'app-session-check',
  templateUrl: './session-check.component.html',
  styleUrls: ['./session-check.component.scss']
})
export class SessionCheckComponent implements OnInit {

  quickLinks: any;
  cardData!: Casaaccount;

  constructor(
    private _dialogRef: MatDialogRef<any>, 
    @Inject(MAT_DIALOG_DATA) private _dialogData : any,
    public _appConfig:AppConfigService,
    private _router:Router
  ) { }

  ngOnInit(): void {
    this.cardData = this._dialogData.cardData;

    this.quickLinks = [
      {
        id: "casa",
        name: "<em>Account </em>Details",
        icon: "casa"
      },
      {
        id: "RETAILVIEWCASATRANSACTION",
        name: "<em>View </em>Transaction",
        icon: "view-transaction"
      },
      {
        id: "replace-card",
        name: "<em>Replace New </em>Card",
        icon: "replace-card"
      },
      {
        id: "debit-card",
        name: "<em>Debit Card </em>Details",
        icon: "debit-card"
      },
      {
        id: "RETAILCHQBKREQ",
        name: "<em>Cheque Book </em>Request",
        icon: "cheque-book"
      },
      {
        id: "RETAILCHQBKREQ",
        name: "<em>Manage </em>Limits",
        icon: "manage-limits"
      }
    ];
  }

  openLink(menu:any){
    this._dialogRef.close();

    this._appConfig.setData('accountCardData', this.cardData);
    let service = this._appConfig.getServiceDetails(menu.id);
    setTimeout(()=>{
      this._router.navigate(service.servicePath);
    });
  }

  closeContextMenu(){
    this._dialogRef.close();
  }

  onCancel() {
    this.closeContextMenu();
  }

  onContinue() {
    this._dialogRef.close('continue');
  }

}
