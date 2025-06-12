import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceContextMenuComponent } from './insurance-context-menu.component';

describe('InsuranceContextMenuComponent', () => {
  let component: InsuranceContextMenuComponent;
  let fixture: ComponentFixture<InsuranceContextMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuranceContextMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsuranceContextMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
