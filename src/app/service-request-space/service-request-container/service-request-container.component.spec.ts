import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceRequestContainerComponent } from './service-request-container.component';

describe('ServiceRequestContainerComponent', () => {
  let component: ServiceRequestContainerComponent;
  let fixture: ComponentFixture<ServiceRequestContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceRequestContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceRequestContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
