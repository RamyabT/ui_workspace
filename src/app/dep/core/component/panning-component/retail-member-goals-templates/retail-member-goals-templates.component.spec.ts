import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailMemberGoalsTemplatesComponent } from './retail-member-goals-templates.component';

describe('RetailMemberGoalsTemplatesComponent', () => {
  let component: RetailMemberGoalsTemplatesComponent;
  let fixture: ComponentFixture<RetailMemberGoalsTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailMemberGoalsTemplatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetailMemberGoalsTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
