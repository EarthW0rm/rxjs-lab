import { TestBed } from '@angular/core/testing';

import { MapExempleService } from './map-exemple.service';

describe('MapExempleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapExempleService = TestBed.get(MapExempleService);
    expect(service).toBeTruthy();
  });
});
