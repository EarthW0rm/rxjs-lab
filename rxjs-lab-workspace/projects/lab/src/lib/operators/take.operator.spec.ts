import { TestBed } from '@angular/core/testing';
import { SwapiModule, FilmsService } from '../swapi';
import { take, switchMap, count } from 'rxjs/operators';

describe('Take', () => {
	beforeEach(() =>
		TestBed.configureTestingModule({
			imports: [SwapiModule.forRoot()]
		})
	);

	it('Utilizando o método take para responder apenas o nome dos 2 primeiros filme da série', done => {
		let countNexts = 0;

		// Carregando a instancia do serviço FilmsService.
		const filmsService: FilmsService = TestBed.get(FilmsService);

		const subscription$ = filmsService
			.GetFilms()
			.pipe(
				switchMap(_ => _.results),
				take(2)
			)
			.subscribe(
				next => {
					countNexts += 1;
					console.log(`O Nome do filme é: ${next.title}`);
				},
				error => {
					console.error(error);
				},
				() => {
					subscription$.unsubscribe();
					expect(countNexts).toBe(2);
					done();
				}
			);
	});
});
