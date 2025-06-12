import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PfmMonthsListControlComponent } from './pfm-months-list-control.component';

describe('PfmMonthsListControlComponent', () => {
  let component: PfmMonthsListControlComponent;
  let fixture: ComponentFixture<PfmMonthsListControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PfmMonthsListControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PfmMonthsListControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
