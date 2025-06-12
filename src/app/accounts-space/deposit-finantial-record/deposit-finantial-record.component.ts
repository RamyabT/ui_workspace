import { Component, OnInit } from '@angular/core';
import { AppConfigService } from '@dep/services';

@Component({
  selector: 'app-deposit-finantial-record',
  templateUrl: './deposit-finantial-record.component.html',
  styleUrls: ['./deposit-finantial-record.component.scss']
})
export class DepositFinantialRecordComponent implements OnInit {

  constructor(
    protected _appConfig: AppConfigService
  ) { }

  ngOnInit(): void {
  }

}
