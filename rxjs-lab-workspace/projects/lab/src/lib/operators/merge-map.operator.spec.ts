import { TestBed } from '@angular/core/testing';
import { SwapiModule, FilmsService, SpaceshipsService } from '../swapi';
import { take, switchMap, map, switchMapTo, concatMap, mergeMap } from 'rxjs/operators';
import { from, of } from 'rxjs';

describe('Operador: mergeMap', () => {
	beforeEach(() =>
		TestBed.configureTestingModule({
			imports: [SwapiModule.forRoot()]
		})
	);

	it('Utilizando o método mergeMap para exibir todas espaço-naves dos filmes', done => {
		// Carregando a instancia do serviço FilmsService.
		const filmsService: FilmsService = TestBed.get(FilmsService);
		const spaceshipsService: SpaceshipsService = TestBed.get(SpaceshipsService);

		const subscription$ = filmsService
			.GetFilms()
			.pipe(
				switchMap(_ => from(_.results)),
				switchMap(_ => from(_.starships)),
				take(10),
				mergeMap(_ => {
					const starshipId = parseInt(_.substr(31, _.substr(31).length - 1), 10);
					return spaceshipsService.GetSpaceship(starshipId)
						.pipe(
							map(__ => `${__.name} - ${__.model}`)
						);
				})
			)
			.subscribe(
				next => {
					console.log(`mergeMap: O Nome e modelo da espaço-nave é: ${next}`);
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
