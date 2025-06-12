import { TestBed } from '@angular/core/testing';

import { VerifyUserIdService } from './verify-user-id.service';

describe('VerifyUserIdService', () => {
  let service: VerifyUserIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerifyUserIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
