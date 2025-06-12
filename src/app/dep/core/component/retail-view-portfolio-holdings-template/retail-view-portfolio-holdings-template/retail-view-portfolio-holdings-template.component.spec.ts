import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RetailViewPortfolioHoldingTemplateComponent } from './retail-view-portfolio-holdings-template.component';

describe('RetailViewPortfolioHoldingTemplateComponent', () => {
  let component: RetailViewPortfolioHoldingTemplateComponent;
  let fixture: ComponentFixture<RetailViewPortfolioHoldingTemplateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailViewPortfolioHoldingTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailViewPortfolioHoldingTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
