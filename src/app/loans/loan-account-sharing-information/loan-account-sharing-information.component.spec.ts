import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountSharingInformationComponent } from './account-sharing-information.component';


describe('AccountSharingInformationComponent', () => {
  let component: AccountSharingInformationComponent;
  let fixture: ComponentFixture<AccountSharingInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountSharingInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountSharingInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
