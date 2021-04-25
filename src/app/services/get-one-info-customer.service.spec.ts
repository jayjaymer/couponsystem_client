import { TestBed } from '@angular/core/testing';

import { GetOneInfoCustomerService } from './get-one-info-customer.service';

describe('GetOneInfoCustomerService', () => {
  let service: GetOneInfoCustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetOneInfoCustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
