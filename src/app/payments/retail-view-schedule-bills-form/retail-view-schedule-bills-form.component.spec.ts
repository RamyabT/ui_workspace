import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailViewScheduleBillsFormComponent } from './retail-view-schedule-bills-form.component';

describe('RetailViewScheduleBillsFormComponent', () => {
  let component: RetailViewScheduleBillsFormComponent;
  let fixture: ComponentFixture<RetailViewScheduleBillsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailViewScheduleBillsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetailViewScheduleBillsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
