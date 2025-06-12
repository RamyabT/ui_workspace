import { TestBed } from '@angular/core/testing';

import { loansBreakupChartService } from './loans-breakup-chart.service';

describe('loansBreakupChartService', () => {
  let service: loansBreakupChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(loansBreakupChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
