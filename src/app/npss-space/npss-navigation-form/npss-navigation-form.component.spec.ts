import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NpssNavigationFormComponent } from './npss-navigation-form.component';

describe('NpssNavigationFormComponent', () => {
  let component: NpssNavigationFormComponent;
  let fixture: ComponentFixture<NpssNavigationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NpssNavigationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NpssNavigationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
