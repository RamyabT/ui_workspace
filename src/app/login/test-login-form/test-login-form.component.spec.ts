import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestLoginFormComponent } from './test-login-form.component';

describe('TestLoginFormComponent', () => {
  let component: TestLoginFormComponent;
  let fixture: ComponentFixture<TestLoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestLoginFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestLoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
