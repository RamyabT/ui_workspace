import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailViewServiceRequestFormComponent } from './retail-view-service-request-form.component';

describe('RetailViewServiceRequestFormComponent', () => {
  let component: RetailViewServiceRequestFormComponent;
  let fixture: ComponentFixture<RetailViewServiceRequestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailViewServiceRequestFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetailViewServiceRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
