import { Component, inject, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConfigService, CustomMenuService, LanguageService } from '@dep/services';
import { Deposits, DepositsSummary } from '../deposits-service/deposits.model';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';

@Component({
  selector: 'app-deposits-context-menu',
  templateUrl: './deposits-contextual-menu.component.html',
  styleUrls: ['./deposits-contextual-menu.component.scss']
})
export class DepositsContextualMenuComponent implements OnInit {
  // private _accountNumber:string = '';
  // @Input() 
  // set accountNumber(accNum:string){
  //   this._accountNumber = accNum;
  //   if(this._accountNumber) this.prepareContextMenu(this._accountNumber);
  // }
  // get accountNumber():string{
  //   return this._accountNumber;
  // }

  @Input('accountNumber') accountNumber: string = '';
  @Input('cardData') cardData: any;
  @Input('showAccountsLoader') showAccountsLoader: boolean = false;

  @Input('quickLinks') 
  set quickLinks(data:any){
    if(data && data.length){
      if(data.length > 5){
        let cloneList = data.slice();
        this.quickActionsList = cloneList.splice(0,5);
        this.showMore = true;
      } else {
        this.quickActionsList = data;
      }
    }
  }
  get quickLinks(){
    return this.quickActionsList;
  }

  private _highlightMenu: string = '';

  // getter function, called whenever the value is accessed
  get highlightMenu(){
    return this._highlightMenu
  }

  // setter function, called whenever the value is set
  @Input() set highlightMenu(highlightMenu){
    this._highlightMenu = highlightMenu;
    if(this._highlightMenu == 'open-new-deposit') {
      this.openLink({
        id: "RETAILOPENNEWDEPOSIT",
        name: "<em>Open New </em>Fixed Deposit",
        icon: "apply-new-deposit"
      });
    }
  }
  
  isPopup: boolean = false;
  // quickLinks: any;
  // cardData: any;
  inverstedAmount: number = 0;
  isMainProduct: boolean = false;

  protected showMore:boolean = false;
  protected quickActionsList:any;
  protected doShowMoreQuickActions: boolean = false;
  protected activeMenu: string = '';
  protected device: DeviceDetectorService = inject(DeviceDetectorService);

  constructor(
    private _dialogRef: MatDialogRef<any>, 
    @Inject(MAT_DIALOG_DATA) private _dialogData : any,
    public _appConfig:AppConfigService,
    private _router:Router,
    private route: ActivatedRoute,
    public activeService:ActiveSpaceInfoService,
    private _menuService: CustomMenuService,
    protected languageService: LanguageService,
  ) { }

  ngOnInit(): void {
    if(this._dialogData.hasOwnProperty('isMainProduct')){
      this.isMainProduct = this._dialogData.isMainProduct;
      
      this.cardData = this._dialogData.cardData as DepositsSummary;
      this.inverstedAmount = this.cardData.accountDetails.reduce((accumulator: number, currentObj: any) => {
        let amount = currentObj?.depositAmount || currentObj?.principalAmount;
        return accumulator + Number(amount);
      }, 0);

      this.isPopup = true;
      this.prepareContextMenu();
    } else if(this._dialogData.hasOwnProperty('cardData')){
      this.cardData = this._dialogData.cardData as Deposits;
      this.isPopup = true;
      this.prepareContextMenu();
    } else {
      this.isPopup = false;
    }

    if(!this.device.isMobile()){
      if(this._appConfig.getData('depositQuickActions')){
        let quickLinks:any=this._appConfig.getData('depositQuickActions');
        let menu:any=quickLinks.find((obj:any)=>obj.serviceCode=='RETAILDEPOSIT');
        if(menu) {
          this.activeMenu=menu.serviceCode;
          this.openLink(menu);
        }
      }
    }
  }

  openLink(menu:any){
    if(this.isPopup) {
      this._dialogRef.close();
      this.accountNumber = (this.isMainProduct) ? this.cardData.accountNumber : this.cardData.accountNumber;
      this._appConfig.setData('accountCardData', this.cardData);
    }
    
    this.activeMenu = menu.serviceCode;
    let service = this._appConfig.getServiceDetails(menu.serviceCode);
    if(menu.serviceCode == 'RETAILRPCONTRACTINFO') {
      this._appConfig.setData('contractType', 'new');
    } else if (menu.serviceCode == 'RETAILRPEXISTINGCONTRACTINFO') {
      this._appConfig.setData('contractType', 'existing');
    } else if (menu.serviceCode == 'RETAILRPOPENTERMDEPOSIT') {
      this._appConfig.setData('contractType', 'deposit');
    }
    setTimeout(()=>{
      let options:any = {};
      if (menu.serviceCode != 'RETAILRPCONTRACTINFO') options.queryParams = {
        accountNumber: this.accountNumber
      }
      this._router.navigate(service.servicePath, options);
    });
    
  }

  closeContextMenu(){
    if(this.isPopup) this._dialogRef.close();
  }

  prepareContextMenu(accountNumber: string = ""){
    this.activeMenu = '';
    let quickLinks:any;

    if(this.isPopup){
      let accountType = this.cardData.accountType;
      if (accountType == 'aviso') quickLinks = this.getQuickActions('AVISOMENU');
      else if (accountType == 'registeredproducts')  quickLinks = this.getQuickActions('REGPRODMENU');
      else quickLinks = this.getQuickActions('TERMDEPOSITMENU');  
      this.quickLinks = quickLinks;
    } else {
      if(this._appConfig.getData('depositQuickActions')){
        quickLinks = this._appConfig.getData('depositQuickActions');
      }
    }

    this.quickLinks = quickLinks;
    
  }

  getQuickActions(menuCode: string): any {
    let contextMenu = this._menuService.getMenuList(menuCode);
    return (contextMenu && contextMenu.length) ? contextMenu : [];
  }

  showMoreQuickActions(){
    this.doShowMoreQuickActions = !this.doShowMoreQuickActions;
  }
  showMoreActions(){
    
  }

}

