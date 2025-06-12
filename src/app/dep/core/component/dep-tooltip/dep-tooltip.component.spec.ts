import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepTooltipComponent } from './dep-tooltip.component';

describe('DepTooltipComponent', () => {
  let component: DepTooltipComponent;
  let fixture: ComponentFixture<DepTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepTooltipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
