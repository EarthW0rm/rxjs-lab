import { TestBed } from '@angular/core/testing';
import { Observable, from } from 'rxjs';

describe('Operador: from', () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it('Utilizando o operador from para uma única resposta', done => {
		const fromObservable: Observable<string> = from(['Faça ou não faça. A tentativa não existe.']);

		const subscription$ = fromObservable
			.subscribe(
				next => {
					console.log(`Yoda diz, ${next}`);
					expect(next).toContain('Faça ou não faça');
				},
				err => {
					console.error(err);
				},
				() => {
					done();
				});
	});

	it('Utilizando o operador from para lidar com varios itens no next', done => {
		const fromObservable: Observable<string> = from(['Sua falta de fé é perturbadora.',
		'Você está controlando seu medo... agora libere a sua raiva. Só o seu ódio poderá destruir-me.',
		'Você não conhece o poder do lado sombrio', 'Luke, eu sou seu pai!' ]);

		const subscription$ = fromObservable
			.subscribe(
				next => {
					console.log(`Quem disse?, ${next}`);
				},
				err => {
					console.error(err);
				},
				() => {
					expect(true).toEqual(true);
					done();
				});
	});
});
