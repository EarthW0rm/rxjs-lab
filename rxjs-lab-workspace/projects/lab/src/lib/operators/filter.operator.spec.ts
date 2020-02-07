import { TestBed } from '@angular/core/testing';
import { SwapiModule, FilmsService } from '../swapi';
import { switchMap, filter } from 'rxjs/operators';

describe('Operador: filter', () => {
	beforeEach(() =>
		TestBed.configureTestingModule({
			imports: [SwapiModule.forRoot()]
		})
	);

	it('Utilizando o método filter para responder apenas o nome dos filmes lancados até 1983', done => {
		let countNexts = 0;

		// Carregando a instancia do serviço FilmsService.
		const filmsService: FilmsService = TestBed.get(FilmsService);

		const subscription$ = filmsService
			.GetFilms()
			.pipe(
				switchMap(_ => _.results),
				filter(_ => new Date(`${_.release_date}T00:00:00.000-0300`).getFullYear() <= 1983)
			)
			.subscribe(
				next => {
					countNexts += 1;
					expect(new Date(`${next.release_date}T00:00:00.000-0300`).getFullYear()).toBeLessThanOrEqual(1983);
					console.log(`Os filmes da primeira temporada são: ${next.title}`);
				},
				error => {
					console.error(error);
				},
				() => {
					expect(countNexts).toBe(3);
					subscription$.unsubscribe();
					done();
				}
			);
	});
});
