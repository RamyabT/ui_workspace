import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersSpendingOverviewComponent } from './members-spending-overview.component';

describe('MembersSpendingOverviewComponent', () => {
  let component: MembersSpendingOverviewComponent;
  let fixture: ComponentFixture<MembersSpendingOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembersSpendingOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembersSpendingOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
