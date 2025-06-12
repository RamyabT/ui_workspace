import { ComponentFixture, TestBed } from '@angular/core/testing';
//import { DepositsLinkAccountsListComponent } from './deposits-link-accounts-list';
import { DepositsLinkAccountsListComponent } from './deposits-link-accounts-list.component';


describe('DepositsAccountsListComponent', () => {
  let component: DepositsLinkAccountsListComponent;
  let fixture: ComponentFixture<DepositsLinkAccountsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositsLinkAccountsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepositsLinkAccountsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
