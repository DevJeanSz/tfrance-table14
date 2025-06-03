import { TestBed } from '@angular/core/testing';

import { TfranceTableService } from './tfrance-table.service';

describe('TfranceTableService', () => {
  let service: TfranceTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TfranceTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
