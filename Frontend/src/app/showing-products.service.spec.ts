import { TestBed } from '@angular/core/testing';

import { ShowingProductsService } from './service/showing-products.service';

describe('ShowingProductsService', () => {
  let service: ShowingProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowingProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
