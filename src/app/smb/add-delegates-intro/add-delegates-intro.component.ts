import { Component, OnInit, Optional } from '@angular/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConfigService, UserAuthService } from '@dep/services';
import { BaseFpxFormComponent, CriteriaQuery } from '@fpx/core';
import { AddDelegatesIntroComponentHelper, AddDelegatesIntroComponentState } from './add-delegates-intro.helper';

@Component({
  selector: 'app-add-delegates-intro',
  templateUrl: './add-delegates-intro.component.html',
  styleUrls: ['./add-delegates-intro.component.scss'],
  providers: [AddDelegatesIntroComponentHelper]
})
export class AddDelegatesIntroComponent extends BaseFpxFormComponent<AddDelegatesIntroComponentHelper,AddDelegatesIntroComponentState> {

  

  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public _etransferHistoryFormComponentHelper: AddDelegatesIntroComponentHelper,
    private _router: Router
  ) { 
    super(formBuilder, router,controlContainer, _etransferHistoryFormComponentHelper);
  }


  override doPreInit(){
    this.addElement('etransferHistoryGridByMe');
    this.addElement('etransferHistoryGridByOthers');
  }

  addDelegatesClickHandler(){
    this._router.navigate(['smb-delegat-space', 'entry-shell','smb','retail-delegateuserreq-form']);
  }

  delegateByMe(){
    // let usId = this.userAuth.getAuthorizationAttr('UserId');
    // let criteriaQuery:CriteriaQuery = new CriteriaQuery();
    // criteriaQuery.addFilterCritertia('createdBy','String','equals',{'searchText':usId})
   
    // this.setInitialCriteria(criteriaQuery);
  }

  delegateByOthers(){
    //  let usId = this.userAuth.getAuthorizationAttr('UserId');
    //     let criteriaQuery:CriteriaQuery = new CriteriaQuery();
    //     criteriaQuery.addFilterCritertia('createdBy','String','notEqual',{'searchText':usId})
       
    //     this.setInitialCriteria(criteriaQuery);

  }
  setInitialCriteria(criteriaQuery: CriteriaQuery) {
    throw new Error('Method not implemented.');
  }
  

}
