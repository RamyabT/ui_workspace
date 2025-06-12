import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSelectionControlComponent } from './product-selection-control.component';

describe('ProductSelectionControlComponent', () => {
  let component: ProductSelectionControlComponent;
  let fixture: ComponentFixture<ProductSelectionControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductSelectionControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSelectionControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
