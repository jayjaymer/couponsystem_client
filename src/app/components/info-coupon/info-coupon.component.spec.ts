import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCouponComponent } from './info-coupon.component';

describe('InfoCouponComponent', () => {
  let component: InfoCouponComponent;
  let fixture: ComponentFixture<InfoCouponComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoCouponComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
