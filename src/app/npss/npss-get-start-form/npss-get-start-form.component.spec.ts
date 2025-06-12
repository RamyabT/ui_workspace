import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NpssGetStartFormComponent } from './npss-get-start-form.component';

describe('NpssGetStartFormComponent', () => {
  let component: NpssGetStartFormComponent;
  let fixture: ComponentFixture<NpssGetStartFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NpssGetStartFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NpssGetStartFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
