import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FbSpaceContainerComponent } from './fb-space-container.component';

describe('FbSpaceContainerComponent', () => {
  let component: FbSpaceContainerComponent;
  let fixture: ComponentFixture<FbSpaceContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FbSpaceContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FbSpaceContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
