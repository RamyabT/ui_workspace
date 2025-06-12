import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfigService } from '@dep/services';

@Component({
  selector: 'app-member-next-allowance',
  templateUrl: './member-next-allowance.component.html',
  styleUrls: ['./member-next-allowance.component.scss']
})
export class MemberNextAllowanceComponent implements OnInit {

  constructor(private _appConfig : AppConfigService ,private _router : Router) { }

  ngOnInit(): void {
  }

  nextallowanceviewall(){
    let service = this._appConfig.getServiceDetails('RETAILMEMBERALLOWANCE');
    this._router.navigate(service.servicePath);
 
  }

}
