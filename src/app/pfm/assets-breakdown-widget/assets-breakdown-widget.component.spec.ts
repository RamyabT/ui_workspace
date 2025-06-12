import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsBreakdownWidgetComponent } from './assets-breakdown-widget.component';

describe('AssetsBreakdownWidgetComponent', () => {
  let component: AssetsBreakdownWidgetComponent;
  let fixture: ComponentFixture<AssetsBreakdownWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetsBreakdownWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetsBreakdownWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
