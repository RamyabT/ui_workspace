import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoansPanelComponent } from './loans-panel.component';

describe('LoansPanelComponent', () => {
  let component: LoansPanelComponent;
  let fixture: ComponentFixture<LoansPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoansPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoansPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
