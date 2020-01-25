import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FilmsService } from '../../swapi/films.service';
import { map } from 'rxjs/operators';

describe('Operador - Map', () => {
	beforeEach(() => TestBed.configureTestingModule({
		imports: [
			HttpClientModule
		],
		providers: [
			{ provide: 'SWAPI_URL', useValue: 'https://swapi.co/api/' }
		]
	}));

	it('should be created', () => {
		const service: FilmsService = TestBed.get(FilmsService);
		expect(service).toBeTruthy();
	});

	it('deve mapear o nome do primeiro filme da saga', done => {
		const service: FilmsService = TestBed.get(FilmsService);
		const subscription$ = service.GetFilm(1)
			.pipe(
				map(_ => _.title)
			)
			.subscribe(
				next => {
					expect(next).toBe('A New Hope'); 
					console.log(`O Primeiro filme da série é: ${next}`);
				},
				error => { 
					console.error(error); 
				},
				() => { 
					subscription$.unsubscribe();

					done();
				}
			);
	});
});
