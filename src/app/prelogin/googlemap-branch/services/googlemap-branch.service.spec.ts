import { TestBed } from '@angular/core/testing';

import { GooglemapBranchService } from './googlemap-branch.service';

describe('GooglemapBranchService', () => {
  let service: GooglemapBranchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GooglemapBranchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
