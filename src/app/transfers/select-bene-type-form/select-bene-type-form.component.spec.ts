import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBeneTypeFormComponent } from './select-bene-type-form.component';

describe('SelectBeneTypeFormComponent', () => {
  let component: SelectBeneTypeFormComponent;
  let fixture: ComponentFixture<SelectBeneTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectBeneTypeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectBeneTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
