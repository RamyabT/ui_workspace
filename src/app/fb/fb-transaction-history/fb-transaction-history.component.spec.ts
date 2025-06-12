import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FbTransactionHistoryComponent } from './fb-transaction-history.component';

describe('FbTransactionHistoryComponent', () => {
  let component: FbTransactionHistoryComponent;
  let fixture: ComponentFixture<FbTransactionHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FbTransactionHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FbTransactionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
