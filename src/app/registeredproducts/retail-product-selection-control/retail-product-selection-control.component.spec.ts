import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RetailProductSelectionControlComponent } from './retail-product-selection-control.component';


describe('RetailProductSelectionControlComponent', () => {
  let component: RetailProductSelectionControlComponent;
  let fixture: ComponentFixture<RetailProductSelectionControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailProductSelectionControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetailProductSelectionControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
