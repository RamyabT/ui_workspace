import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreloginContainerComponent } from './prelogin-container.component';

describe('PreloginContainerComponent', () => {
  let component: PreloginContainerComponent;
  let fixture: ComponentFixture<PreloginContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreloginContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreloginContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
