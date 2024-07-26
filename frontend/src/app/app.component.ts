import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private pokedex: ApiService) {}

  ngOnInit() {
    this.pokedex.getAllPokemon().subscribe((res) => {
      console.log(res);
      var list = res.results;
      list.forEach((pokemon: any) => {
        this.getPokemonData(pokemon);
      });
    });
  }

  getPokemonData(pokemon: any) {
    var url = pokemon.url;
    this.pokedex.getPokemonData(url).subscribe((res) => {
      console.log('Pokemon!--------------------');
      console.log(res);
    });
  }
}
