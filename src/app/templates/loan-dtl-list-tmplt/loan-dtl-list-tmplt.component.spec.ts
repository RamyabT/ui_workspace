import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanDtlListTmpltComponent } from './loan-dtl-list-tmplt.component';

describe('LoanDtlListTmpltComponent', () => {
  let component: LoanDtlListTmpltComponent;
  let fixture: ComponentFixture<LoanDtlListTmpltComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanDtlListTmpltComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanDtlListTmpltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
