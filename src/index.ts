import { of, from, Observable, observable, fromEvent } from "rxjs";
import axios from "axios";
import { elementAt, mergeMap, mergeMapTo } from "rxjs/operators";

const fetchData$ = (url: string) =>
  new Observable(observer => {
    const source = axios.CancelToken.source();
    axios
      .get(url, {
        cancelToken: source.token
      })
      .then(response => {
        observer.next(response.data);
        observer.complete();
      })
      .catch(error => {
        if (!axios.isCancel(error)) {
          observer.error(error);
        }
      });

    return () => {
      source.cancel("Cancelled");
    };
  });

const repo = document.getElementById("repositories");
const poke = document.getElementById("pokemon");

const repoInputChange$ = fromEvent(repo, "change").pipe(
  mergeMap(element =>
    fetchData$(
      `https://api.github.com/search/repositories?q=${
        (element.target as HTMLInputElement).value
      }`
    )
  )
);

repoInputChange$.subscribe({
  next: (result: { total_count: number }) => {
    document.getElementById("repositories-result").innerText = String(
      result.total_count
    );
  }
});

const pokeInputChange$ = fromEvent(poke, "change").pipe(
  mergeMap(element =>
    fetchData$(
      `https://pokeapi.co/api/v2/type/${
        (element.target as HTMLInputElement).value
      }`
    )
  )
);

pokeInputChange$.subscribe({
  next: (result: { name: string; pokemon: { pokemon: { name: string }}[] }) => {
    document.getElementById("pokemon-type").innerText = result.name;
    document.getElementById("pokemon-count").innerText = String(
      result.pokemon.length
    );
    document.getElementById("pokemon-names").innerText = result.pokemon
      .map(({ pokemon: {name} }) => name)
      .join(", ");
  },
  error: () => {
    document.getElementById("pokemon-type").innerText = "Ошибка";
    document.getElementById("pokemon-count").innerText = "Ошибка";
    document.getElementById("pokemon-names").innerText = "Ошибка";
  }
});
