import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasaTransactionsDtlsTmpltComponent } from './casa-transactions-dtls-tmplt.component';

describe('CasaTransactionsDtlsTmpltComponent', () => {
  let component: CasaTransactionsDtlsTmpltComponent;
  let fixture: ComponentFixture<CasaTransactionsDtlsTmpltComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasaTransactionsDtlsTmpltComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CasaTransactionsDtlsTmpltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
