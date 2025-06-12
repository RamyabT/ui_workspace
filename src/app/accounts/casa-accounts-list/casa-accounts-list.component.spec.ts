import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CASAAccountsListComponent } from './casa-accounts-list.component';


describe('CASAAccountsListComponent', () => {
  let component: CASAAccountsListComponent;
  let fixture: ComponentFixture<CASAAccountsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CASAAccountsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CASAAccountsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
