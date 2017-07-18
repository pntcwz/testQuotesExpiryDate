import { TestBed, inject } from '@angular/core/testing';

import { KwhttpService } from './kwhttp.service';

describe('KwhttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KwhttpService]
    });
  });

  it('should be created', inject([KwhttpService], (service: KwhttpService) => {
    expect(service).toBeTruthy();
  }));
});
