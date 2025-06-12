import { TestBed } from '@angular/core/testing';

import { NpssMainService } from './npss-main.service';

describe('NpssMainService', () => {
  let service: NpssMainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NpssMainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
