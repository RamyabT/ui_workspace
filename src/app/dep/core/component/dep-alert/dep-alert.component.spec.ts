import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepAlertComponent } from './dep-alert.component';

describe('DepAlertComponent', () => {
  let component: DepAlertComponent;
  let fixture: ComponentFixture<DepAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepAlertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
