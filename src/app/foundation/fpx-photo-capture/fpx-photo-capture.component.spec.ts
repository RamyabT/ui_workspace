import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FpxPhotoCaptureComponent } from './fpx-photo-capture.component';

describe('FpxPhotoCaptureComponent', () => {
  let component: FpxPhotoCaptureComponent;
  let fixture: ComponentFixture<FpxPhotoCaptureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FpxPhotoCaptureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FpxPhotoCaptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
