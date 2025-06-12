import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from '@dep/core';
import { AppConfigService } from '@dep/services';
import { WalletsummaryService } from '../wallet/wallet-summary-service/walletsummary.service';
import { WalletSpaceManager } from './wallet-space.manager';
import { AccountsSpaceManager } from '../accounts-space/accounts-space.manager';
import { wallet } from '../wallet/wallet-summary-service/walletsummary.model';

@Component({
  selector: 'app-wallet-space',
  templateUrl: './wallet-space.component.html',
  styleUrls: ['./wallet-space.component.scss'],
    providers: [ WalletSpaceManager ]
})
export class WalletSpaceComponent implements OnInit {
  walletSummary : any = [];
  @ViewChild('spaceHome', { read: ElementRef }) spaceHome!: ElementRef;
  protected activeTabIndex: number = 0;

  protected moduleHeaderTop: number = 0;
   initialLoad : any = false;
  isReceivedAccounts: any;
  constructor(protected _device: DeviceDetectorService, private _appConfig: AppConfigService, private _router: Router, private _walletsummary : WalletsummaryService , private _accountSpaceMgr: AccountsSpaceManager, private _walletSpaceMgr : WalletSpaceManager) { }

  ngOnInit(): void {
  this.initialLoad = sessionStorage.getItem('walletlist');
       this.fetchwallectSummary();    
    
  }

  walletRegistration() {
 
    sessionStorage.setItem('walletlist',"true");
    this._router.navigate([
      "wallet-space",
      "entry-shell",
      "wallet",
      "wallet-reg-form"
    ]);
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.moduleHeaderTop = -(this.spaceHome.nativeElement.offsetTop);
    });
 
  }

fetchwallectSummary(){
  this._walletsummary.fetchWalletSummary().subscribe({
    next:(res:any) =>{
       console.log("taskfiveres",res)
      this.walletSummary =  res ;
      if(this.walletSummary.length > 0){
        this.isReceivedAccounts =  res;
      }else{
        this.isReceivedAccounts =  [];
      }
      console.log("walletSummary",this.walletSummary)
       this._appConfig.setData('walletID' ,this.walletSummary?.[0].walletId);

this.onCasaAccountReceivedHandler(this.walletSummary)
      },
    error: (error:any) =>{

    }
  })
}

 onCasaAccountReceivedHandler(walletAccountsList:wallet[]){
    if(walletAccountsList && walletAccountsList.length != 0){
      walletAccountsList.map((item) => item.id = item.walletAccountNumber);
      this._walletSpaceMgr.setwalletAccountsList(walletAccountsList);
     }
  }


  onTabChanged($event:any){}


}
