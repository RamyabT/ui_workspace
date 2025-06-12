import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherRequestFormComponent } from './other-request-form.component';

describe('OtherRequestFormComponent', () => {
  let component: OtherRequestFormComponent;
  let fixture: ComponentFixture<OtherRequestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherRequestFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
