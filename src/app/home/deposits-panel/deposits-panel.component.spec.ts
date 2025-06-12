import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositsPanelComponent } from './deposits-panel.component';

describe('DepositsPanelComponent', () => {
  let component: DepositsPanelComponent;
  let fixture: ComponentFixture<DepositsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositsPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepositsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
