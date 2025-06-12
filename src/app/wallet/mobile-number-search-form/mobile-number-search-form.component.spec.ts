import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileNumberSearchFormComponent } from './mobile-number-search-form.component';

describe('MobileNumberSearchFormComponent', () => {
  let component: MobileNumberSearchFormComponent;
  let fixture: ComponentFixture<MobileNumberSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileNumberSearchFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileNumberSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
