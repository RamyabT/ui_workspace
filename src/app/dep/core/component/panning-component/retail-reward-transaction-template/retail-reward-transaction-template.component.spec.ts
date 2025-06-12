import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailRewardTransactionTemplateComponent } from './retail-reward-transaction-template.component';

describe('RetailRewardTransactionTemplateComponent', () => {
  let component: RetailRewardTransactionTemplateComponent;
  let fixture: ComponentFixture<RetailRewardTransactionTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailRewardTransactionTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetailRewardTransactionTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
