import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPayIntroComponent } from './app-pay-intro.component';

describe('AppPayIntroComponent', () => {
  let component: AppPayIntroComponent;
  let fixture: ComponentFixture<AppPayIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppPayIntroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppPayIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
