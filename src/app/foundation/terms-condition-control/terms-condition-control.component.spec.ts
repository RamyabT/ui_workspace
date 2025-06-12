import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsConditionControlComponent } from './terms-condition-control.component';

describe('TermsConditionControlComponent', () => {
  let component: TermsConditionControlComponent;
  let fixture: ComponentFixture<TermsConditionControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermsConditionControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermsConditionControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
