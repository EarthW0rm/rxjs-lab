# Introdução ao RxJS

> Essa tradução foi feita a partir do original: https://www.learnrxjs.io/learn-rxjs/concepts/rxjs-primer 

Novo para o RxJS? Neste artigo, faremos um curso intensivo sobre todos os principais conceitos que você precisará para começar a entender e começar a ser produtivo com o RxJS. Aguente firme e vamos começar!


## O que é um Observable?

Um observable representa um fluxo ou fonte de dados que pode chegar ao longo do tempo. Você pode criar um observable a partir de quase tudo, mas o caso de uso mais comum no RxJS é de eventos. Pode ser qualquer coisa, desde movimentos do mouse, cliques de botão, entrada em um campo de texto ou até alterações de rota. A maneira mais fácil de criar um observable é através das funções built in de criação. Por exemplo, podemos usar a função auxiliar fromEvent para criar um observable de eventos de clique do mouse:

```js
// import the fromEvent operator
import { fromEvent } from 'rxjs';

// grab button reference
const button = document.getElementById('myButton');

// create an observable of button clicks
const myObservable = fromEvent(button, 'click');
```


Neste ponto, temos um observable, mas não está fazendo nada. Isso ocorre porque os observables são frios ou não ativam um produtor (como ligar um ouvinte de evento) até que exista um...


## Subscriptions?

Subscription são o que coloca tudo em movimento. Você pode pensar nisso como uma torneira, você tem um fluxo de água pronto para ser aproveitado (observable), alguém só precisa girar a manivela. No caso de observables, esse papel pertence ao subscriber.

Para criar uma subscription, chame o método subscribe, fornecendo uma função (ou objeto) - também conhecido como observer. É aqui que você pode decidir como reagir (programação reativa) a cada evento. Vamos examinar o que acontece no cenário anterior quando uma subscription é criada:

```js
// import the fromEvent operator
import { fromEvent } from 'rxjs';

// grab button reference
const button = document.getElementById('myButton');

// create an observable of button clicks
const myObservable = fromEvent(button, 'click');

// for now, let's just log the event on each click
const subscription = myObservable.subscribe(event => console.log(event));
```

No exemplo acima, chamar myObservable.subscribe () irá:

1. Configurar um event listener no nosso botão para eventos de clique.
2. Chame a função que passamos para o método de subscribe (observer) a cada clique
evento.
3. Retorne um objeto de subscription com um unsubscribe que contém limpeza
lógica, que remover os ouvintes do evento.

O método de subscribe também aceita um mapa de objetos para lidar com o caso de erro ou conclusão. Você provavelmente não usará isso apenas fornecendo uma função, mas é bom estar ciente disso, se necessário:

```js
// instead of a function, we will pass an object with next, error, and complete methods
const subscription = myObservable.subscribe({
  // on successful emissions
  next: event => console.log(event),
  // on errors
  error: error => console.log(error),
  // called once on completion
  complete: () => console.log('complete!')
});
```

É importante observar que cada subscription criará um novo contexto de execução. Isso significa que chamar subscribe pela segunda vez criará um novo event listener:

```js
// addEventListener called
const subscription = myObservable.subscribe(event => console.log(event));

// addEventListener called again!
const secondSubscription = myObservable.subscribe(event => console.log(event));

// clean up with unsubscribe
subscription.unsubscribe();
secondSubscription.unsubscribe();
```

Por padrão, uma subscription cria uma conversa unilateral entre o observable e o observer. É como o seu chefe (o observable) gritando (emitindo) para você (o observador) fazer o merge de uma PR ruim. Isso também é conhecido como unicasting. Se você preferir um cenário de conferência - um observable, muitos observers -, você adotará uma abordagem diferente, que inclui multicasting com os Subjects (explicitamente ou nos bastidores). Mais sobre isso em um artigo futuro!

Vale a pena notar que, quando discutimos uma fonte Observable que emite dados para os observers, esse é um modelo baseado em push. A fonte não sabe ou não se importa com o que os subscribers fazem com os dados, simplesmente os leva adiante.

Embora trabalhar em um fluxo de eventos seja agradável, é tão útil por si só. O que faz do RxJS o "lodash for events" são seus...

## Operators

Os operadores oferecem uma maneira de manipular valores de uma fonte, retornando um observable dos valores transformados. Muitos dos operadores RxJS parecerão familiares se você estiver acostumado aos métodos javascript de array. Por exemplo, se você deseja transformar valores emitidos de uma fonte observable, pode usar o ***map***:

```js
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
/*
 *  'of' allows you to deliver values in a sequence
 *  In this case, it will emit 1,2,3,4,5 in order.
 */
const dataSource = of(1, 2, 3, 4, 5);

// subscribe to our source observable
const subscription = dataSource
  .pipe(
    // add 1 to each emitted value
    map(value => value + 1)
  )
  // log: 2, 3, 4, 5, 6
  .subscribe(value => console.log(value));
```

Ou, se você deseja filtrar valores específicos, pode usar o ***filter***:

```js
import { of } from 'rxjs';
import { filter } from 'rxjs/operators';

const dataSource = of(1, 2, 3, 4, 5);

// subscribe to our source observable
const subscription = dataSource
  .pipe(
    // only accept values 2 or greater
    filter(value => value >= 2)
  )
  // log: 2, 3, 4, 5
  .subscribe(value => console.log(value));
```

Na prática, se houver um problema que você precise resolver, é mais provável que exista um operador para isso. E enquanto o grande número de operadores pode ser esmagador quando você inicia sua jornada RxJS, você pode reduzi-la a um pequeno punhado (e iremos) para começar a ser eficaz. Com o tempo, você passará a apreciar a flexibilidade da biblioteca de operadores quando cenários obscuros chegarem inevitavelmente.

**Uma coisa que você deve ter notado no exemplo acima é que existem operadores dentro de um...**


## Pipe

A função de pipe é a linha de montagem da sua fonte de dados observable através de seus operadores. Assim como a matéria-prima de uma fábrica passa por uma série de paradas antes de se tornar um produto final, os dados de origem podem passar por uma linha de operadores onde você pode manipular, filtrar e transformar os dados para se adequar ao seu caso de uso. Não é incomum usar 5 (ou mais) operadores em uma cadeia de observables, contida na função de pipe.

Por exemplo, uma solução tipeahead construída com observables pode usar um grupo de operadores para otimizar o processo de solicitação e exibição:

```js
// observable of values from a text box, pipe chains operators together
inputValue
  .pipe(
    // wait for a 200ms pause
    debounceTime(200),
    // if the value is the same, ignore
    distinctUntilChanged(),
    // if an updated value comes through while request is still active cancel previous request and 'switch' to new observable
    switchMap(searchTerm => typeaheadApi.search(searchTerm))
  )
  // create a subscription
  .subscribe(results => {
    // update the dom
  });
```

**Mas como você sabe qual operador se encaixa no seu caso de uso? A boa notícia é...**


## Os operadores podem ser agrupados em categorias comuns

A primeira parada ao procurar o operador correto é encontrar uma categoria relacionada. Precisa filtrar dados de uma fonte? Confira os operadores de filtragem (filtering). Tentando rastrear um bug ou depurar o fluxo de dados através do seu fluxo observável? Existem operadores de utilidade (utility) que farão o truque. As categorias de operadores incluem ...

## Operadores de criação

Esses operadores permitem a criação de um observable a partir de praticamente qualquer coisa. De casos de uso genéricos a específicos, você pode transformar tudo em um fluxo.

Por exemplo, suponha que estamos criando uma barra de progresso à medida que o usuário percorre um artigo. Podemos transformar o evento de rolagem em um fluxo utilizando o operador ***fromEvent***:

```js
fromEvent(scrollContainerElement, 'scroll')
  .pipe(
    // we will discuss cleanup strategies like this in future article
    takeUntil(userLeavesArticle)
  )
  .subscribe(event => {
    // calculate and update DOM
  });
```


Os operadores de criação mais usados são ***of***, ***from*** e ***fromEvent***.


## Operadores combinados

Os operadores combinados permitem a junção de informações de vários observables. Ordem, tempo e estrutura dos valores emitidos é a principal variação entre esses operadores.

Por exemplo, podemos combinar atualizações de várias fontes de dados para realizar um cálculo:

```js
// give me the last emitted value from each source, whenever either source emits
combineLatest(sourceOne, sourceTwo).subscribe(
  ([latestValueFromSourceOne, latestValueFromSourceTwo]) => {
    // perform calculation
  }
);
```

Os operadores combinados mais usados são ***combineLatest***, ***concat***, ***merge***, ***startWith*** e ***withLatestFrom***.


## Erro ao manipular operadores

Os operadores de manipulação de erros fornecem maneiras eficazes de lidar com erros e executar retentativas, caso eles ocorram.

Por exemplo, podemos usar o ***catchError*** para proteger contra falha nas solicitações de rede:

```js
source
  .pipe(
    mergeMap(value => {
      return makeRequest(value).pipe(
        catchError(handleErrorByReturningObservable)
      );
    })
  )
  .subscribe(value => {
    // take action
  });
```

O operador de tratamento de erros mais comum é ***catchError***.


## Operadores de filtragem

Os operadores de filtragem fornecem técnicas para aceitar - ou declinar - valores de uma fonte observable e lidar com a backpressure ou a acumulação de valores dentro de um fluxo.

Por exemplo, podemos usar o operador ***take*** para capturar apenas os 5 primeiros valores emitidos de uma fonte:

```js
source.pipe(take(5)).subscribe(value => {
  // take action
});
```

Os operadores de filtragem mais usados são ***debounceTime***, ***distinctUntilChanged***, ***filter***, ***take*** e ***takeUntil***.

## Operadores de multicasting

No RxJS, os observáveis são frios ou unicast (uma fonte por subscriber) por padrão. Esses operadores podem criar um observable quente ou multicast, permitindo que os efeitos colaterais sejam compartilhados entre vários subscribers.

Por exemplo, podemos desejar que os subscribers atrasados compartilhem e recebam o último valor emitido de uma fonte ativa:

```js
const source = data.pipe(shareReplay());

const firstSubscriber = source.subscribe(value => {
  // perform some action
});

// sometime later...

// second subscriber gets last emitted value on subscription, shares execution context with 'firstSubscriber'
const secondSubscriber = source.subscribe(value => {
  // perform some action
});
```

O operador de multicast mais usado é o ***shareReplay***.

## Operadores de transformação

Transformar valores à medida que passam por uma cadeia de operadores é uma tarefa comum. Esses operadores fornecem técnicas de transformação para praticamente qualquer caso de uso que você encontrará.

Por exemplo, podemos querer acumular um objeto de estado de uma fonte ao longo do tempo, semelhante ao Redux:

```js
source
  .pipe(
    scan((accumulatedState, currentState) => {
      return { ...accumulatedState, ...currentState };
    })
  )
  .subscribe();
```

Os operadores de transformação mais usados são ***concatMap***, ***map***, ***mergeMap***, ***scan*** e ***switchMap***.


