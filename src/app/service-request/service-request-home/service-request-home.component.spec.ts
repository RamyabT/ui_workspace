import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicerequestHomeComponent } from './service-request-home.component';

describe('ServicerequestHomeComponent', () => {
  let component: ServicerequestHomeComponent;
  let fixture: ComponentFixture<ServicerequestHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicerequestHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicerequestHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
