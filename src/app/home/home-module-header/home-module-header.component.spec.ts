import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeModuleHeaderComponent } from './home-module-header.component';

describe('HomeModuleHeaderComponent', () => {
  let component: HomeModuleHeaderComponent;
  let fixture: ComponentFixture<HomeModuleHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeModuleHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeModuleHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
