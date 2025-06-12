import { Component, Inject, OnInit, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppConfigService } from '@dep/services';
import { Loans } from '../loans-service/loans.model';
import { ActiveSpaceInfoService } from '@dep/core';

@Component({
  selector: 'app-loans-contextual-menu',
  templateUrl: './loans-contextual-menu.component.html',
  styleUrls: ['./loans-contextual-menu.component.scss']
})
export class LoansContextualMenuComponent implements OnInit {
  quickLinks: any;
  cardData!: Loans;

  private _activeSpaceInfoService: ActiveSpaceInfoService = inject(ActiveSpaceInfoService);
  constructor(
    private _dialogRef: MatDialogRef<any>, 
    @Inject(MAT_DIALOG_DATA) private _dialogData : any,
    private _appConfig:AppConfigService,
    private _router:Router
  ) { 
  }
  ngOnInit(): void {
    this.cardData = this._dialogData.cardData;

    this.quickLinks = [
      {
        id: "RETAILLLOANCLOSURE",
        name: "<em>Early Settlement</em> Request",
        icon: "replace-card"
      }
    ]
  }
  openLink(menu:any){
    this._dialogRef.close();

    this._appConfig.setData('accountCardData', this.cardData);
    let service = this._appConfig.getServiceDetails(menu.id);
    
    this._activeSpaceInfoService.setAccountNumber(this.cardData.loanAccountNumber);

    setTimeout(()=>{
      this._router.navigate(service.servicePath);
    });
  }

  closeContextMenu(){
    this._dialogRef.close();
  }

}
