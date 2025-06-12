import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositsTabContainerComponent } from './deposits-tab-container.component';

describe('DepositTabContainerComponent', () => {
  let component: DepositsTabContainerComponent;
  let fixture: ComponentFixture<DepositsTabContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositsTabContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepositsTabContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
