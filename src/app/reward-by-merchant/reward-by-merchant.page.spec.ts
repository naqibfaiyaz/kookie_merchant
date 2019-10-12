import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardByMerchantPage } from './reward-by-merchant.page';

describe('RewardByMerchantPage', () => {
  let component: RewardByMerchantPage;
  let fixture: ComponentFixture<RewardByMerchantPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardByMerchantPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardByMerchantPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
