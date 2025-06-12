import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessDeniedFormComponent } from './access-denied-form.component';

describe('AccessDeniedFormComponent', () => {
  let component: AccessDeniedFormComponent;
  let fixture: ComponentFixture<AccessDeniedFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessDeniedFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessDeniedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
