import { TestBed } from '@angular/core/testing';

import { ServiceCodeAccessGuardService } from './service-code-access-guard.service';

describe('ServiceCodeAccessGuardService', () => {
  let service: ServiceCodeAccessGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceCodeAccessGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
