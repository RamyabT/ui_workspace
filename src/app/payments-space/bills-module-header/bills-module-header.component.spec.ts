import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsModuleHeaderComponent } from './bills-module-header.component';

describe('BillsModuleHeaderComponent', () => {
  let component: BillsModuleHeaderComponent;
  let fixture: ComponentFixture<BillsModuleHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillsModuleHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillsModuleHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
