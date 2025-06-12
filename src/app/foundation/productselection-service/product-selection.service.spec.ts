import { TestBed } from '@angular/core/testing';

import { ProductSelectionControlService } from './product-selection.service';

describe('ProductSelectionControlService', () => {
  let service: ProductSelectionControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductSelectionControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
