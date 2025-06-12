import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositFinantialRecordComponent } from './deposit-finantial-record.component';

describe('DepositFinantialRecordComponent', () => {
  let component: DepositFinantialRecordComponent;
  let fixture: ComponentFixture<DepositFinantialRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositFinantialRecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepositFinantialRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
