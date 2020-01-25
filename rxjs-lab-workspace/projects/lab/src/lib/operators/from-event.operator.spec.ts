import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SwapiModule, FilmsService } from "../swapi";
import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';

@Component({
    template: '<button #input id="test-button">Button</button>'
})
export class FromEventTestComponent implements AfterViewInit {
    @ViewChild('input', {static: false}) button: ElementRef;

    public buttonStream$: Observable<any>;

    ngAfterViewInit() {
        this.buttonStream$ = fromEvent(this.button.nativeElement, 'click');
    }
}

describe('Operador: fromEvent', async () => {
    let component: FromEventTestComponent;
    let fixture: ComponentFixture<FromEventTestComponent>;
    let componentTemplate: any;
    let cicleCount = 0;

    /**
     * Iniciando a TestBed, importando o módulo do Swapi.
     */
    beforeEach(async () => TestBed.configureTestingModule({
        declarations: [
            FromEventTestComponent
        ],
        imports: [
            SwapiModule.forRoot()
        ]
    }));

    beforeEach(async () => {
        fixture = TestBed.createComponent(FromEventTestComponent);
        component = fixture.componentInstance;
        componentTemplate = fixture.debugElement.nativeElement;
        fixture.detectChanges();
    });

    it('Assinado o evendo de click de um componente via subscription', done => {
        cicleCount = 0;

        const subscription$ = component.buttonStream$.subscribe(
            next => {
                cicleCount += 1
                console.log(`Click foi acionado: ${cicleCount}`);

                if(cicleCount = 5) {
                    subscription$.unsubscribe();
                    expect(cicleCount).toEqual(5);
                    done();
                }
            },
            error => { 
                console.error(error); 
            }
        );

        const buttonElement = componentTemplate.querySelector('#test-button');

        for(var i=0; i < 5; i++) {
            buttonElement.click(); //Simulando o click no botão.
            fixture.detectChanges(); // Disparando o ciclo de vida do componente angular
        }
    });

});