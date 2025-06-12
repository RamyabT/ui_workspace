import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailMemberChoresTemplatesComponent } from './retail-member-chores-templates.component';

describe('RetailMemberChoresTemplatesComponent', () => {
  let component: RetailMemberChoresTemplatesComponent;
  let fixture: ComponentFixture<RetailMemberChoresTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailMemberChoresTemplatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetailMemberChoresTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
