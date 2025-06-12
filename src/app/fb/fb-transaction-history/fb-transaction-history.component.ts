 import { Component, OnInit, inject } from '@angular/core';
import { ActiveSpaceInfoService } from '@dep/core';

@Component({
  selector: 'app-fb-transaction-history',
  templateUrl: './fb-transaction-history.component.html',
  styleUrls: ['./fb-transaction-history.component.scss']
})
export class FbTransactionHistoryComponent implements OnInit {
  private _activeSpaceInfoService: ActiveSpaceInfoService = inject(ActiveSpaceInfoService);
  private tabs = ['casa', 'deposit', 'loan'];
  protected activeTabIndex: number = 0;
  constructor() { }

  ngOnInit(): void {
  }

  onTabChanged($event:any){
    let module = this.tabs[$event.index];
    this._activeSpaceInfoService.setModule(module as any);
  }

}
