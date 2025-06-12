import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepaidCardTabContainerComponent } from './prepaidcard-tab-container.component';

describe('PrepaidCardTabContainerComponent', () => {
  let component: PrepaidCardTabContainerComponent;
  let fixture: ComponentFixture<PrepaidCardTabContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrepaidCardTabContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrepaidCardTabContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
