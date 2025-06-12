import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deposits-home',
  templateUrl: './deposits-home.component.html',
  styleUrls: ['./deposits-home.component.scss']
})
export class DepositsHomeComponent implements OnInit {

  checkDeposit: string = 'true';
  constructor() { }

  ngOnInit(): void {
  }

}
