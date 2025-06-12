import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExistingLoanDetailsHelper } from './existing-loan-details.helper';

describe('ExistingLoanDetailsHelper', () => {
  let component: ExistingLoanDetailsHelper;
  let fixture: ComponentFixture<ExistingLoanDetailsHelper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExistingLoanDetailsHelper ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExistingLoanDetailsHelper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
