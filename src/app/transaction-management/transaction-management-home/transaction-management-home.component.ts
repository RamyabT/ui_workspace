import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction-management-home',
  templateUrl: './transaction-management-home.component.html',
  styleUrls: ['./transaction-management-home.component.scss']
})
export class TransactionManagementHomeComponent implements OnInit {
  protected activeTabIndex: number = 0;
  
  constructor() { }

  ngOnInit(): void {
  }

  onTabChanged($event:any){

  }

}
