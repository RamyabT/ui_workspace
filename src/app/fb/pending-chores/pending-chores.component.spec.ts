import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingChoresComponent } from './pending-chores.component';

describe('PendingChoresComponent', () => {
  let component: PendingChoresComponent;
  let fixture: ComponentFixture<PendingChoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingChoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingChoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
