import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfersContextMenuComponent } from './transfers-context-menu.component';

describe('TransfersContextMenuComponent', () => {
  let component: TransfersContextMenuComponent;
  let fixture: ComponentFixture<TransfersContextMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransfersContextMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransfersContextMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
