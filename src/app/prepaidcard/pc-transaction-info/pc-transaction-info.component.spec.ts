import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcTransactionInfoComponent } from './pc-transaction-info.component';

describe('PcTransactionInfoComponent', () => {
  let component: PcTransactionInfoComponent;
  let fixture: ComponentFixture<PcTransactionInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcTransactionInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PcTransactionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
