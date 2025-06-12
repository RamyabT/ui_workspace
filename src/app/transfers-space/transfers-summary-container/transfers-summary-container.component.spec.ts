import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfersSummaryContainerComponent } from './transfers-summary-container.component';

describe('TransfersSummaryContainerComponent', () => {
  let component: TransfersSummaryContainerComponent;
  let fixture: ComponentFixture<TransfersSummaryContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransfersSummaryContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransfersSummaryContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
