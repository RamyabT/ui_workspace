import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailureResultFormComponent } from './failure-result-form.component';

describe('FailureResultFormComponent', () => {
  let component: FailureResultFormComponent;
  let fixture: ComponentFixture<FailureResultFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FailureResultFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FailureResultFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
