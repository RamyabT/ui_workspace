import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsPanelComponent } from './accounts-panel.component';

describe('AccountsPanelComponent', () => {
  let component: AccountsPanelComponent;
  let fixture: ComponentFixture<AccountsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountsPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
