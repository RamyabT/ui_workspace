import { TestBed } from '@angular/core/testing';
import { RetailProductSelectionListControlService } from './retail-product-selection-list.service';


describe('ProductSelectionControlService', () => {
  let service: RetailProductSelectionListControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetailProductSelectionListControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
