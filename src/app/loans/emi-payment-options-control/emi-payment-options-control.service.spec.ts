import { TestBed } from '@angular/core/testing';

import { EmiPaymentOptionsControlService } from './emi-payment-options-control.service';

describe('EmiPaymentOptionsControlService', () => {
  let service: EmiPaymentOptionsControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmiPaymentOptionsControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
