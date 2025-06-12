import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasaSummaryCardComponent } from './casa-summary-card.component';

describe('CasaSummaryCardComponent', () => {
  let component: CasaSummaryCardComponent;
  let fixture: ComponentFixture<CasaSummaryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasaSummaryCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CasaSummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
