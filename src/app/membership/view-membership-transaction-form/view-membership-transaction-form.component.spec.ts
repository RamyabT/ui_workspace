import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewMembershipTransactionFormComponent } from './view-membership-transaction-form.component';


describe('ViewCasaTransactionFormComponent', () => {
  let component: ViewMembershipTransactionFormComponent;
  let fixture: ComponentFixture<ViewMembershipTransactionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMembershipTransactionFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMembershipTransactionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
