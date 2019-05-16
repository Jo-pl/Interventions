import { TestBed } from '@angular/core/testing';

import { ProblemeService } from './probleme.service';

describe('ProblemeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProblemeService = TestBed.get(ProblemeService);
    expect(service).toBeTruthy();
  });
});
