import { TestBed } from '@angular/core/testing';

import { CatchErrorExempleService } from './catch-error-exemple.service';

describe('CatchErrorExempleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CatchErrorExempleService = TestBed.get(CatchErrorExempleService);
    expect(service).toBeTruthy();
  });
});
