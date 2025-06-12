import { Component, OnInit, inject } from '@angular/core';
import { AppConfigService } from '@dep/services';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})
export class GoalsComponent implements OnInit {

  protected _appConfig: AppConfigService = inject(AppConfigService);

  constructor() { }

  ngOnInit(): void {
  }

}
