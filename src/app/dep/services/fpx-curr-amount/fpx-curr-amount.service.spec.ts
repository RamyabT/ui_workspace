import { TestBed } from '@angular/core/testing';

import { FpxCurrAmountService } from './fpx-curr-amount.service';

describe('FpxCurrAmountService', () => {
  let service: FpxCurrAmountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FpxCurrAmountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
