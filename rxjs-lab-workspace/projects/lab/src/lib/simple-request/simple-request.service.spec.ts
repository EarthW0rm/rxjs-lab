import { TestBed } from '@angular/core/testing';
import { tap } from 'rxjs/operators';
import { SimpleRequestService } from './simple-request.service';
import { HttpClientModule } from '@angular/common/http';

describe('SimpleRequestService', async () => {
	beforeEach(() => TestBed.configureTestingModule({
		imports: [
			HttpClientModule
		],
		providers: [
			{ provide: 'SWAPI_URL', useValue: 'https://swapi.co/api/' }
		]
	}));

	it('deve inicializar o serviço SimpleRequestService', () => {
		const service: SimpleRequestService = TestBed.get(SimpleRequestService);
		expect(service).toBeTruthy();
	});

	/**
	 * Esse metodo de teste demonstra o acesso a um serviço que responde os dados da api via Observable.
	 * Utilizamos o operador tap para executar uma intração com o resultado sem afetar a Subscription.
	 * Utilizamos o callback next para escrever os nomes dos filmes no console.
	 * Utilizamos o callback de erro para escrever no console quaisquer erros.
	 * Utilizamos o callback do complete para destruir a assinatura da subscrição e dar o sinal para completar o teste.
	 */
	it('deve listar os filmes 7 filmes da saga star wars', done => {
		const service: SimpleRequestService = TestBed.get(SimpleRequestService);
		const subscription$ = service.GetFilms()
			.pipe(
				tap(_ => expect(_.count).toEqual(7)),
				tap(_ => expect(_.results.length).toEqual(7)),
			)		
			.subscribe(next => {
				next.results.forEach(_ => {
					console.log(_.title);
				});
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
