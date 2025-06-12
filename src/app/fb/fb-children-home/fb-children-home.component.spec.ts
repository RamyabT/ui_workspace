import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FbChildrenHomeComponent } from './fb-children-home.component';

describe('FbChildrenHomeComponent', () => {
  let component: FbChildrenHomeComponent;
  let fixture: ComponentFixture<FbChildrenHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FbChildrenHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FbChildrenHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
