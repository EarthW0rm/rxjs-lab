import { TestBed } from '@angular/core/testing';
import { SwapiModule, FilmsService, SpaceshipsService } from '../swapi';
import { take, switchMap, map, switchMapTo } from 'rxjs/operators';
import { from, of } from 'rxjs';

describe('Operador: switchMap', () => {
	beforeEach(() =>
		TestBed.configureTestingModule({
			imports: [SwapiModule.forRoot()]
		})
	);

	it('Utilizando o método switchMap para passar a lista de results', done => {
		// Carregando a instancia do serviço FilmsService.
		const filmsService: FilmsService = TestBed.get(FilmsService);

		const subscription$ = filmsService
			.GetFilms()
			.pipe(
				switchMap(_ => _.results)
			)
			.subscribe(
				next => {
					console.log(`O Nome do filme é: ${next.title}`);
				},
				error => {
					console.error(error);
				},
				() => {
					expect(true).toBe(true);
					subscription$.unsubscribe();
					done();
				}
			);
	});

	it('Utilizando o método switchMap para exibir as espaço-naves do primeiro filme', done => {
		// Carregando a instancia do serviço FilmsService.
		const filmsService: FilmsService = TestBed.get(FilmsService);
		const spaceshipsService: SpaceshipsService = TestBed.get(SpaceshipsService);

		const subscription$ = filmsService
			.GetFilm(1)
			.pipe(
				switchMap(_ => from(_.starships)),
				switchMap(_ => {
					const starshipId = parseInt(_.substr(31, _.substr(31).length - 1), 10);
					return of(spaceshipsService.GetSpaceship(starshipId)
						.pipe(
							map(__ => `${__.name} - ${__.model}`)
						));
				})
			)
			.subscribe(
				next => {
					next.subscribe(_ => console.log(`O Nome e modelo da espaço-nave é: ${_}`) );
				},
				error => {
					console.error(error);
				},
				() => {
					expect(true).toBe(true);
					subscription$.unsubscribe();
					done();
				}
			);
	});
});
