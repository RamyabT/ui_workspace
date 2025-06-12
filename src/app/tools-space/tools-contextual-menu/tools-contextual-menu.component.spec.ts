import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsContextualMenuComponent } from './tools-contextual-menu.component';

describe('ToolsContextualMenuComponent', () => {
  let component: ToolsContextualMenuComponent;
  let fixture: ComponentFixture<ToolsContextualMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolsContextualMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolsContextualMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
