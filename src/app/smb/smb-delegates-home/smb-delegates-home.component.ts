import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-smb-delegates-home',
  templateUrl: './smb-delegates-home.component.html',
  styleUrls: ['./smb-delegates-home.component.scss']
})
export class SmbDelegatesHomeComponent implements OnInit {
  protected activeTabIndex: number = 0;
  
  constructor() { }

  ngOnInit(): void {
  }

  onTabChanged($event:any){

  }

}
