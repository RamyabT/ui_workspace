import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasaNavigationFormComponent } from './loans-navigation-form.component';

describe('CasaNavigationFormComponent', () => {
  let component: CasaNavigationFormComponent;
  let fixture: ComponentFixture<CasaNavigationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasaNavigationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CasaNavigationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
