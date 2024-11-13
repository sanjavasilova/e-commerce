import { TestBed } from '@angular/core/testing';

import { ShopService } from './service/shop-service';

describe('ShopServiceService', () => {
  let service: ShopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
