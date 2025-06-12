import { Injectable, EventEmitter } from '@angular/core';
import {
  AsyncValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import {
  BaseFpxDataService,
  CreateFn,
  FindAllFn,
  FindByKeyFn,
  HttpRequest,
  LookUpFn,
  ModifyFn,
} from '@common/models';
import { HttpProviderService } from  '@fpx/core';
import { IHttpSuccessPayload } from '@core/models';
import { map, Observable, of } from 'rxjs';
import { NPSSContactViewingROGRID } from './contact-list-ro-grid.model';

@Injectable()
export class NPSSContactViewingROGRIDService implements BaseFpxDataService<any> {
 constructor(private _httpProvider : HttpProviderService) { }
}
