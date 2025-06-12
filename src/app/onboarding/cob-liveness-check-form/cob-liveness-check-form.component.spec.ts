import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CobLivenessCheckFormComponent } from './cob-liveness-check-form.component';

describe('CobLivenessCheckFormComponent', () => {
  let component: CobLivenessCheckFormComponent;
  let fixture: ComponentFixture<CobLivenessCheckFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CobLivenessCheckFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CobLivenessCheckFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
