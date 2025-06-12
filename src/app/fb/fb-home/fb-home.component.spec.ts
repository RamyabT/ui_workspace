import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FbHomeComponent } from './fb-home.component';

describe('FbHomeComponent', () => {
  let component: FbHomeComponent;
  let fixture: ComponentFixture<FbHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FbHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FbHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
