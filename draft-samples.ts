import { forkJoin, from } from "rxjs";
import { tap, switchMap } from "rxjs/operators";

const request = (url: string) => from(fetch(url).then(res => res.json()));

const testForkJoin = () =>
  forkJoin([
    request(`https://swapi.co/api/people/1/`),
    request(`https://swapi.co/api/people/2/`),
    request(`https://swapi.co/api/people/3/`)
  ])
  .pipe(
    tap(console.log)
  )
  .subscribe();

const testSwitchMap = () =>
  request(`https://swapi.co/api/people/1/`)
    .pipe(
      switchMap(response => forkJoin(response.films.map(url => request(url)))),
      tap(console.log)
    )
    .subscribe()
    
