import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoansMoneyFlowComponent } from './loans-money-flow.component';

describe('LoansMoneyFlowComponent', () => {
  let component: LoansMoneyFlowComponent;
  let fixture: ComponentFixture<LoansMoneyFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoansMoneyFlowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoansMoneyFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
