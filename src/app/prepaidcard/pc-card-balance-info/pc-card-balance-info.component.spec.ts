import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcCardBalanceInfoComponent } from './pc-card-balance-info.component';

describe('PcCardBalanceInfoComponent', () => {
  let component: PcCardBalanceInfoComponent;
  let fixture: ComponentFixture<PcCardBalanceInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcCardBalanceInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PcCardBalanceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
