import { Component, OnInit, inject } from '@angular/core';
import { AppConfigService } from '@dep/services';

@Component({
  selector: 'upcoming-payments-widget',
  templateUrl: './upcoming-payments-widget.component.html',
  styleUrls: ['./upcoming-payments-widget.component.scss']
})
export class  UpcomingPaymentsWidgetComponent implements OnInit {

  appConfig: AppConfigService = inject(AppConfigService);
  
  constructor() { }

  ngOnInit(): void {
  }

}
