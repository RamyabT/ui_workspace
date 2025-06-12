import { Component, EventEmitter, inject, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeviceDetectorService } from '@dep/core';
import { AppConfigService } from '@dep/services';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-deposits-mob-link-accounts-list',
  templateUrl: './deposits-mob-link-accounts-list.component.html',
  styleUrls: ['./deposits-mob-link-accounts-list.component.scss']
})
export class DepositsMobLinkAccountsComponent implements OnInit {
 // linkAcccountsLists:any = [];
  title: string = 'Link account';
  protected _appConfig: AppConfigService = inject(AppConfigService);

  constructor(
    private _dialogRef: MatDialogRef<any>, 
    @Inject(MAT_DIALOG_DATA) private _dialogData : any,
    protected _device: DeviceDetectorService,
    private _router:Router
  ) { }

  ngOnInit(): void {
    //this.moreActions =  this._dialogData.moreActionsList;
    // this.linkAcccountsLists=[{
    //   name:
    // }]

    // let refreshAvisoMobDtl$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    //     this._appConfig.setData('refreshAvisoMobDtl$', {
    //       "observable": refreshAvisoMobDtl$.asObservable(),
    //       "subject": refreshAvisoMobDtl$
    //     });
    
    //     let refreshQtradeMobDtl$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    //     this._appConfig.setData('refreshQtradeMobDtl$', {
    //       "observable": refreshQtradeMobDtl$.asObservable(),
    //       "subject": refreshQtradeMobDtl$
    //     });
  }

  openLink(menu:any){
    console.log("MORE ACTION: ", menu);
    this._dialogRef.close(menu);
  }
  closeContextMenu() {
    this._dialogRef.close();
  }
  openAvisoLink(){
    
    this._dialogRef.close();
   // this.close();
    this._router.navigate(['accounts-space', 'entry-shell', 'deposits', 'retail-linked-investment-req-form'], {
      queryParams: {
        linkAccount: 'Aviso Wealth*'
      }
    });
    // this._appConfig.getData('refreshAvisoMobDtl$').subject.next({
    //   refreshAvisoMobDtl: true,
    // });
    this._appConfig.setData('AvisoMobDtl','Aviso');
    return;
  }
  openQtradeLink(){
    this._dialogRef.close();
    //this.close();
    this._router.navigate(['accounts-space', 'entry-shell', 'deposits', 'retail-linked-investment-req-form'], {
      queryParams: {
        linkAccount: 'Qtrade Direct Investing�'
      }
    });
    // this._appConfig.getData('refreshQtradeMobDtl$').subject.next({
    //   refreshQtradeMobDtl: true,
    // });
     this._appConfig.setData('QtradeMobDtl','Qtrade');
    return;
  }

}
