import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfersInfoFormComponent } from './transfers-info-form.component';

describe('TransfersInfoFormComponent', () => {
  let component: TransfersInfoFormComponent;
  let fixture: ComponentFixture<TransfersInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransfersInfoFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransfersInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
