import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingsAccountListRoTmpltComponent } from './savings-account-list-ro-tmplt.component';

describe('SavingsAccountListRoTmpltComponent', () => {
  let component: SavingsAccountListRoTmpltComponent;
  let fixture: ComponentFixture<SavingsAccountListRoTmpltComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavingsAccountListRoTmpltComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavingsAccountListRoTmpltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
