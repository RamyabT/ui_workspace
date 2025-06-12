import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherRequestContextualMenuComponent } from './other-request-contextual-menu.component';

describe('OtherRequestContextualMenuComponent', () => {
  let component: OtherRequestContextualMenuComponent;
  let fixture: ComponentFixture<OtherRequestContextualMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherRequestContextualMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherRequestContextualMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
