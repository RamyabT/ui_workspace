import { TestBed } from '@angular/core/testing';

import { PfmMonthsService } from './pfm-months.service';

describe('PfmMonthsService', () => {
  let service: PfmMonthsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PfmMonthsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
