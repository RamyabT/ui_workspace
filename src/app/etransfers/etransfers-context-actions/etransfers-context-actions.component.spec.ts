import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtransfersContextActionsComponent } from './etransfers-context-actions.component';

describe('EtransfersContextActionsComponent', () => {
  let component: EtransfersContextActionsComponent;
  let fixture: ComponentFixture<EtransfersContextActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtransfersContextActionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtransfersContextActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
