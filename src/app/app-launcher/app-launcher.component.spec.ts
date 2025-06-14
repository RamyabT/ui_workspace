import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLauncherComponent } from './app-launcher.component';

describe('AppLauncherComponent', () => {
  let component: AppLauncherComponent;
  let fixture: ComponentFixture<AppLauncherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppLauncherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppLauncherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
