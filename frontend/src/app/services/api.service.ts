import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  getPokemonData(url: string): Observable<any> {
    return this.http.get(`${url}`);
  }

  getAllPokemon(): Observable<any> {
    return this.http.get('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
  }

  getPokemonPicture(id: number): Observable<any> {
    return this.http.get(`/assets/cms2/img/pokedex/full/${id}.png`, {
      responseType: 'blob',
    });
  }
}
