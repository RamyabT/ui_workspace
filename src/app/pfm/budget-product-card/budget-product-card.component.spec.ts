import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BudgetProductCardComponent } from './budget-product-card.component';



describe('BudgetProductCardComponent', () => {
  let component: BudgetProductCardComponent;
  let fixture: ComponentFixture<BudgetProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetProductCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
