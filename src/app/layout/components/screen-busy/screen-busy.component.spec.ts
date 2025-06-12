import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenBusyComponent } from './screen-busy.component';

describe('ScreenBusyComponent', () => {
  let component: ScreenBusyComponent;
  let fixture: ComponentFixture<ScreenBusyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreenBusyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScreenBusyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
