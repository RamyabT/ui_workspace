import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsAsideBarComponent } from './bills-aside-bar.component';

describe('BillsAsideBarComponent', () => {
  let component: BillsAsideBarComponent;
  let fixture: ComponentFixture<BillsAsideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillsAsideBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillsAsideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
