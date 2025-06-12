import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceRequestContainerComponent } from './service-request-container/service-request-container.component';
import { ServiceRequestSpaceRoutingModule } from './service-request-space-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FpxCoreModule } from '@fpx/core';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../dep/core/material.module';
import { FoundationModule } from '../foundation/foundation.module';
import { ServiceRequestModule } from '../service-request/service-request.module';
import { HomeModule } from '../home/home.module';
import { SharedServiceRequestModule } from '../service-request/shared-service-request.module';



@NgModule({
  declarations: [
    ServiceRequestContainerComponent
  ],
  imports: [
    CommonModule,
    ServiceRequestSpaceRoutingModule,
    TranslateModule,
    FpxCoreModule,
    MaterialModule,
    FoundationModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceRequestModule,
    SharedServiceRequestModule,
    HomeModule
  ]
})
export class ServiceRequestSpaceModule { }
