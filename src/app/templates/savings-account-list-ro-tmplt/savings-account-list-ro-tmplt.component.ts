import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AppConfigService } from '@dep/services';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-savings-account-list-ro-tmplt',
  templateUrl: './savings-account-list-ro-tmplt.component.html',
  styleUrls: ['./savings-account-list-ro-tmplt.component.scss']
})
export class SavingsAccountListRoTmpltComponent implements OnInit, OnDestroy {
  @Input ('selectedData') selectedData:any;
  private _npssSavingsAccountSub$:BehaviorSubject<any> = new BehaviorSubject<any>(null);

  private isPrimaryUpdated: boolean = false;

  constructor(
    private _appConfig: AppConfigService
  ) { }
  
  ngOnInit(): void {
    if(this._appConfig.hasData('npssSavingsAccount$')){
      this._npssSavingsAccountSub$ = this._appConfig.getData('npssSavingsAccount$').subject;
      this._appConfig.getData('npssSavingsAccount$').observable.subscribe(
        (res:any) => {
          if(res) {
            this.isPrimaryUpdated = true;
            if(this.selectedData.accountNumber != res.accountNumber){
              this.selectedData.isPrimary = false;
            }
          }
        }
      );
    }
  }

  ngAfterViewInit(){
    if(this.selectedData.hasEnrolled) this.selectedData.selected = true;
    if(this.selectedData.isPrimary) this._npssSavingsAccountSub$.next(this.selectedData);
  }

  ngOnDestroy(): void {}

  onSelectAccount($event:any){
    this.selectedData.selected = $event.checked;
    if(this.selectedData.selected && !this.isPrimaryUpdated){
      this.selectedData.isPrimary = true;
      this._npssSavingsAccountSub$.next(this.selectedData);
    }
  }

  setAsDefault($event:any){
    $event.stopPropagation();
    this.selectedData.isPrimary = true;
    this._npssSavingsAccountSub$.next(this.selectedData);
  }

  restrictEvent($event:any){
    if(!$event.target.closest('mat-checkbox')){
      $event.stopPropagation();
    }
  }

}
