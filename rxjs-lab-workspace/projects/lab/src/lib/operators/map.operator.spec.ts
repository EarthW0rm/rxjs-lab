import { TestBed } from '@angular/core/testing';
import { map } from 'rxjs/operators';
import { SwapiModule, FilmsService } from '../swapi';

describe('Operador: map', () => {

	/**
     * Iniciando a TestBed, importando o módulo do Swapi.
     */
    beforeEach(() => TestBed.configureTestingModule({
		imports: [
			SwapiModule.forRoot()
		]
    }));

	it('Utilizando o método map para responder apenas o nome do primeiro filme da série', done => {
		//Carregando a instancia do serviço FilmsService.
		const filmsService: FilmsService = TestBed.get(FilmsService);
		
		const subscription$ = filmsService.GetFilm(1)
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
