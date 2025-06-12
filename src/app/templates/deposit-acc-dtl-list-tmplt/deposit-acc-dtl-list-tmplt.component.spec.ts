import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositsAccDtlListTmpltComponent } from './deposit-acc-dtl-list-tmplt.component';

describe('CasaAccDtlListTmpltComponent', () => {
  let component: DepositsAccDtlListTmpltComponent;
  let fixture: ComponentFixture<DepositsAccDtlListTmpltComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositsAccDtlListTmpltComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepositsAccDtlListTmpltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
