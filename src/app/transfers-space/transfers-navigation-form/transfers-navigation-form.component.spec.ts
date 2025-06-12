import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfersNavigationFormComponent } from './transfers-navigation-form.component';

describe('TransfersNavigationFormComponent', () => {
  let component: TransfersNavigationFormComponent;
  let fixture: ComponentFixture<TransfersNavigationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransfersNavigationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransfersNavigationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
