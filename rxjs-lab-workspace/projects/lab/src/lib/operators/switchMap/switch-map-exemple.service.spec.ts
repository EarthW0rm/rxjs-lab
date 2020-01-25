import { TestBed } from '@angular/core/testing';

import { SwitchMapExempleService } from './switch-map-exemple.service';

describe('SwitchMapExempleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SwitchMapExempleService = TestBed.get(SwitchMapExempleService);
    expect(service).toBeTruthy();
  });
});
