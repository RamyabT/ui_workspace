import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FbQuickActionsComponent } from './fb-quick-actions.component';

describe('FbQuickActionsComponent', () => {
  let component: FbQuickActionsComponent;
  let fixture: ComponentFixture<FbQuickActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FbQuickActionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FbQuickActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
