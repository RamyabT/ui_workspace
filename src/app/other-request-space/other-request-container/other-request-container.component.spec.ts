import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherRequestContainerComponent } from './other-request-container.component';

describe('OtherRequestContainerComponent', () => {
  let component: OtherRequestContainerComponent;
  let fixture: ComponentFixture<OtherRequestContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherRequestContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherRequestContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
