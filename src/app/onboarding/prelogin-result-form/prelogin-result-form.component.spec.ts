import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreloginResultFormComponent } from './prelogin-result-form.component';

describe('PreloginResultFormComponent', () => {
  let component: PreloginResultFormComponent;
  let fixture: ComponentFixture<PreloginResultFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreloginResultFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreloginResultFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
