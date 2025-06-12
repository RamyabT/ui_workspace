import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsInsightsComponent } from './accounts-insights.component';

describe('AccountsInsightsComponent', () => {
  let component: AccountsInsightsComponent;
  let fixture: ComponentFixture<AccountsInsightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountsInsightsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountsInsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
