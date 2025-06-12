import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepaidcardContextMenuComponent } from './prepaidcard-context-menu.component';

describe('PrepaidcardContextMenuComponent', () => {
  let component: PrepaidcardContextMenuComponent;
  let fixture: ComponentFixture<PrepaidcardContextMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrepaidcardContextMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrepaidcardContextMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
