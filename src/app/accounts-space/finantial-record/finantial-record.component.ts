import { Component, OnInit } from '@angular/core';
import { AppConfigService } from '@dep/services';

@Component({
  selector: 'app-finantial-record',
  templateUrl: './finantial-record.component.html',
  styleUrls: ['./finantial-record.component.scss']
})
export class FinantialRecordComponent implements OnInit {

  constructor(
    protected _appConfig: AppConfigService
  ) { }

  ngOnInit(): void {
  }

}
