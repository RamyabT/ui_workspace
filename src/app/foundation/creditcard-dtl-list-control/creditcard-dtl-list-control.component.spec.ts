import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditcardDtlListControlComponent } from './creditcard-dtl-list-control.component';

describe('CreditcardDtlListControlComponent', () => {
  let component: CreditcardDtlListControlComponent;
  let fixture: ComponentFixture<CreditcardDtlListControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditcardDtlListControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditcardDtlListControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
