import { TestBed } from '@angular/core/testing';

import { PfmSummaryService } from './pfm-summary.service';

describe('PfmSummaryService', () => {
  let service: PfmSummaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PfmSummaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
