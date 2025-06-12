import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcTransactionInfoComponent } from './dc-transaction-info.component';

describe('DcTransactionInfoComponent', () => {
  let component: DcTransactionInfoComponent;
  let fixture: ComponentFixture<DcTransactionInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DcTransactionInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DcTransactionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
