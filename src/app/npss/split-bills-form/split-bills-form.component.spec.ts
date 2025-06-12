import { ComponentFixture, TestBed } from '@angular/core/testing';

import {SplitBillsFormComponent } from './split-bills-form.component';

describe('OtherRequestFormComponent', () => {
  let component: SplitBillsFormComponent;
  let fixture: ComponentFixture<SplitBillsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplitBillsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SplitBillsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
