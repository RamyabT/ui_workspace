import { ComponentFixture, TestBed } from '@angular/core/testing';


import { DepositContextMenuComponent } from './deposit-context-menu.component';

describe('DepositContextMenuComponent', () => {
  let component: DepositContextMenuComponent;
  let fixture: ComponentFixture<DepositContextMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositContextMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepositContextMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
