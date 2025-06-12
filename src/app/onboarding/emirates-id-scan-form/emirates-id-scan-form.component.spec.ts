import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmiratesIdScanFormComponent } from './emirates-id-scan-form.component';

describe('EmiratesIdScanFormComponent', () => {
  let component: EmiratesIdScanFormComponent;
  let fixture: ComponentFixture<EmiratesIdScanFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmiratesIdScanFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmiratesIdScanFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
