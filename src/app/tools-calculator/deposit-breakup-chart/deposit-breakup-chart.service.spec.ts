import { TestBed } from '@angular/core/testing';

import { depositBreakupChartService } from './deposit-breakup-chart.service';

describe('depositBreakupChartService', () => {
  let service: depositBreakupChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(depositBreakupChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
