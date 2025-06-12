import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsTransactionRoGridComponent } from './rewards-transaction-ro-grid.component';

describe('RewardsTransactionRoGridComponent', () => {
  let component: RewardsTransactionRoGridComponent;
  let fixture: ComponentFixture<RewardsTransactionRoGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RewardsTransactionRoGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RewardsTransactionRoGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
