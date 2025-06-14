import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceUnavailableComponent } from './service-unavailable.component';

describe('MpinLoginFormComponent', () => {
  let component: ServiceUnavailableComponent;
  let fixture: ComponentFixture<ServiceUnavailableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceUnavailableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceUnavailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
