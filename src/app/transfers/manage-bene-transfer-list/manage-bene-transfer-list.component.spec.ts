import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CASAAccountsTransferListComponent } from './casa-accounts-transfer-list.component';


describe('CASAAccountsTransferListComponent', () => {
  let component: CASAAccountsTransferListComponent;
  let fixture: ComponentFixture<CASAAccountsTransferListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CASAAccountsTransferListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CASAAccountsTransferListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
