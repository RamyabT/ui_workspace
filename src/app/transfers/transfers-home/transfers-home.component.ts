import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { APPCONSTANTS } from '@dep/constants';
import { ActiveSpaceInfoService } from '@dep/core';

@Component({
  selector: 'app-transfers-home',
  templateUrl: './transfers-home.component.html',
  styleUrls: ['./transfers-home.component.scss']
})
export class TransfersHomeComponent implements OnInit {
  private _activeSpaceInfoService: ActiveSpaceInfoService = inject(ActiveSpaceInfoService);
  private tabs = ['casa', 'deposit', 'loan'];
  protected activeTabIndex: number = 0;
  protected appConstant: any = APPCONSTANTS;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onTabChanged($event:any){
    let module = this.tabs[$event.index];
    this._activeSpaceInfoService.setModule(module as any);
  }

  seeAll(){
    this.router.navigate(['/transfers-space/display-shell/transfers/view-scheduled-transfers']);
  }

}
