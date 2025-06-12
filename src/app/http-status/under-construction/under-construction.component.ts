import { Component, inject, OnInit, Optional } from '@angular/core';
import { UnderConstructionHelper, UnderConstructionState } from './under-construction.helper';
import { DeviceDetectorService } from '@dep/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent } from '@fpx/core';

@Component({
  selector: 'app-under-construction',
  templateUrl: './under-construction.component.html',
  styleUrls: ['./under-construction.component.scss'],
  providers: [ UnderConstructionHelper ]
})
export class UnderConstructionComponent extends BaseFpxFormComponent<UnderConstructionHelper, UnderConstructionState> {

  
    protected _device: DeviceDetectorService = inject(DeviceDetectorService);
    constructor(
      _formBuilder: FormBuilder,
      _route: Router,
      @Optional() _controlContainer: ControlContainer,
      _underConstructionHelper: UnderConstructionHelper,
    ) {
      super(_formBuilder, _route, _controlContainer, _underConstructionHelper);
  
    
    }
  
    override doPreInit(){
    }
  
  }


