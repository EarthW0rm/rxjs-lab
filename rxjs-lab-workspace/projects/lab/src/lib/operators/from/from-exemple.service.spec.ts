import { TestBed } from '@angular/core/testing';

import { FromExempleService } from './from-exemple.service';

describe('Operador: catchError', () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: FromExempleService = TestBed.get(FromExempleService);
		expect(service).toBeTruthy();
	});
});
