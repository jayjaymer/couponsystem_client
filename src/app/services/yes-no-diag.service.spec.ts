import { TestBed } from '@angular/core/testing';

import { YesNoDiagService } from './yes-no-diag.service';

describe('YesNoDiagService', () => {
  let service: YesNoDiagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YesNoDiagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
