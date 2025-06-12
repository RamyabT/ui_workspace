import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PfmSpaceContainerComponent } from './pfm-space-container.component';

describe('PfmSpaceContainerComponent', () => {
  let component: PfmSpaceContainerComponent;
  let fixture: ComponentFixture<PfmSpaceContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PfmSpaceContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PfmSpaceContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
