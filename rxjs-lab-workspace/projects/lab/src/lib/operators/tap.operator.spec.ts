import { TestBed } from '@angular/core/testing';
import { SwapiModule, FilmsService } from "../swapi";

import { tap } from 'rxjs/operators';

describe('Operador: tap', async () => {

    /**
     * Iniciando a TestBed, importando o módulo do Swapi.
     */
    beforeEach(() => TestBed.configureTestingModule({
		imports: [
			SwapiModule.forRoot()
		]
    }));
    
    it('Utilizando o método tap para escrever no console o total de itens na propriedade result', done => {
        //Carregando a instancia do serviço FilmsService.
        const filmsService: FilmsService = TestBed.get(FilmsService);

        const subscription$ = filmsService.GetFilms() // Chamando o método que encapsula o HttpClient da swapi.
            .pipe( // Iniciando um pipe, um pipe e um duto sequencial, cada operador é executado na sequencia informada.
                tap(_ => console.log(`A Saga SW possui ${_.results.length} filmes.`)), // Este primeiro tap será responsável por escrever na console a quantidade de filmes da saga.
				tap(_ => expect(_.results.length).toEqual(_.count)), // O segundo tap aciona um expect para testar se a propriedade count é igual ao total de itens na propriedade result.
            )		
            // Efetuando a subscricao ao Observable, esse processo inicia a chamada do HttpClient, ate então tudo dentro do pipe ainda não foi acionado.
			.subscribe(
            // No caso da requisição http o next trata da resposta de serviço http
            next => {
                console.log(`O Primeiro filme é: ${next.results[0].title}`);
            },
            // O Segundo callback recupera erros não tratados.
			err => {
				console.error(err);
            },
            // O Terceiro método aciona o complete em caso de uma requisição http com sucesso é o segundo método a ser chamado.
			() => {
				subscription$.unsubscribe(); //Efetuando a destruicao da assinatura.
				done(); //Enviando o sinal de done para o test method
			});
    });

});