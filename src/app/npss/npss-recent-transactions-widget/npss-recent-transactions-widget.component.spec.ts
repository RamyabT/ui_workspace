import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NpssRecentTransactionsWidgetComponent } from './npss-recent-transactions-widget.component';

describe('NpssRecentTransactionsWidgetComponent', () => {
  let component: NpssRecentTransactionsWidgetComponent;
  let fixture: ComponentFixture<NpssRecentTransactionsWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NpssRecentTransactionsWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NpssRecentTransactionsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
