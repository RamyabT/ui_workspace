import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-deposit-account-summary-tmplt',
  templateUrl: './deposit-account-summary-tmplt.component.html',
  styleUrls: ['./deposit-account-summary-tmplt.component.scss']
})
export class DepositAccountSummaryTmpltComponent implements OnInit {
  @Input() selectedData:any;
  @Input() index:number = 0;

  toggleActions:boolean = false;

  constructor() { }

  ngOnInit(): void {

  }

  toggleContextActions(index:any) {
    this.toggleActions = !this.toggleActions;
  }

}
