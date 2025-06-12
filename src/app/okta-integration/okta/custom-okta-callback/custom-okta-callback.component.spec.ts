import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomOktaCallbackComponent } from './custom-okta-callback.component';

describe('CustomOktaCallbackComponent', () => {
  let component: CustomOktaCallbackComponent;
  let fixture: ComponentFixture<CustomOktaCallbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomOktaCallbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomOktaCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
