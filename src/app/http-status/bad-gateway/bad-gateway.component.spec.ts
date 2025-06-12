import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BadGatewayComponent } from './bad-gateway.component';

describe('MpinLoginFormComponent', () => {
  let component: BadGatewayComponent;
  let fixture: ComponentFixture<BadGatewayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BadGatewayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BadGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
