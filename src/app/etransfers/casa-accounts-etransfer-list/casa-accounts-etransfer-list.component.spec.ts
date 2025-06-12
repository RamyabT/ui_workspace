import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasaAccountsEtransferListComponent } from './casa-accounts-etransfer-list.component';

describe('CasaAccountsEtransferListComponent', () => {
  let component: CasaAccountsEtransferListComponent;
  let fixture: ComponentFixture<CasaAccountsEtransferListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasaAccountsEtransferListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CasaAccountsEtransferListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
