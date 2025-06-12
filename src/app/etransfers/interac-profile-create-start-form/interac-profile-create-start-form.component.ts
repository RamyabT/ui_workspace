import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseFpxFunctionality } from '@fpx/core';

@Component({
  selector: 'app-interac-profile-create-start-form',
  templateUrl: './interac-profile-create-start-form.component.html',
  styleUrls: ['./interac-profile-create-start-form.component.scss']
})
export class InteracProfileCreateStartFormComponent extends BaseFpxFunctionality implements OnInit {

  constructor(private _router: Router) { 
    super();
  }

  ngOnInit(): void {
  }

  startCreateProfile(){
   
    this._router.navigate(['etransfers-space/entry-shell/etransfers/retail-etransfer-customer-form']);
  }

}
