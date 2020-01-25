import { TestBed } from '@angular/core/testing';

import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { SwapiModule, FilmsService } from '../swapi';
import { JsendEnvelope, PagedResults, Film } from '../models';

describe('Operador: catchError', () => {

    /**
     * Iniciando a TestBed, importando o módulo do Swapi.
     */
    beforeEach(() => TestBed.configureTestingModule({
		imports: [
			SwapiModule.forRoot()
		]
    }));

	it('Utilizando o método catchError para caputurar o erro genérico e retornar um envelope error jsend', done => {
		TestBed.configureTestingModule({
			imports: [
				SwapiModule.forRoot('https://swapi.co/api-fake/')
			]
		});

		const filmsService: FilmsService = TestBed.get(FilmsService);

		const subscription$ = filmsService.GetFilms()
			.pipe(
				map((_: PagedResults<Film>) => { return { data: _, status: 'success'} as JsendEnvelope<PagedResults<Film>>}),
				catchError(_ => of({ data: null, status: 'error', message: _.message } as JsendEnvelope<PagedResults<Film>>))
			)
			.subscribe(next => {
				console.log(`Mensagem de erro: ${next.message}`)
				expect(next.status).toEqual('error');
			},
			err => {
				console.error(err);
			},
			() => {
				subscription$.unsubscribe();
				done();
			});
	});
});
