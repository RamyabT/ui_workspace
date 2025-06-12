import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasaTransactionInfoComponent } from './casa-transaction-info.component';

describe('CasaTransactionInfoComponent', () => {
  let component: CasaTransactionInfoComponent;
  let fixture: ComponentFixture<CasaTransactionInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasaTransactionInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CasaTransactionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
