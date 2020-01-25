import { TestBed } from '@angular/core/testing';

import { CatchErrorExempleService } from './catch-error-exemple.service';
import { HttpClientModule } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { JsendEnvelope, PagedResults, Film } from '../../models';
import { of } from 'rxjs';

describe('CatchErrorExempleService', () => {
	beforeEach(() => TestBed.configureTestingModule({
		imports: [
			HttpClientModule
		],
		providers: [
			{ provide: 'SWAPI_URL', useValue: 'https://swapi.co/api/' }
		]
	}));

	it('deve inicializar o serviço CatchErrorExempleService', () => {
		const service: CatchErrorExempleService = TestBed.get(CatchErrorExempleService);
		expect(service).toBeTruthy();
	});

	it('deve caputurar o erro genérico via catchError e retornar um envelope error jsend', done => {
		TestBed.configureTestingModule({
			imports: [
				HttpClientModule
			],
			providers: [
				{ provide: 'SWAPI_URL', useValue: 'https://swapi.co/api-fake/' }
			]
		})

		const service: CatchErrorExempleService = TestBed.get(CatchErrorExempleService);
		const subscription$ = service.GetFilms()
			.pipe(
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
