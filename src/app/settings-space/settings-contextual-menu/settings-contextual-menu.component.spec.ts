import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsContextualMenuComponent } from './settings-contextual-menu.component';

describe('SettingsContextualMenuComponent', () => {
  let component: SettingsContextualMenuComponent;
  let fixture: ComponentFixture<SettingsContextualMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsContextualMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsContextualMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
