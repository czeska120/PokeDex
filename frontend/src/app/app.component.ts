import { Component, ViewChild } from '@angular/core';
import { ApiService } from './services/api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  // Paginator & Search
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSize = 10;
  searchText: any;

  pokemonList: any[] = [];
  filteredPokemonList: any[] = [];

  // Sort by ID & Name
  idSort = false;
  idAscending = false;
  nameSort = false;
  nameAscending = false;

  constructor(private pokedex: ApiService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.viewPokemon();
  }

  viewPokemon() {
    try {
      this.pokedex.getAllPokemon().subscribe(async (res) => {
        console.log(res);
        var list = res.results;
        const pokemonDataPromises = list.map((pokemon: any) =>
          this.getPokemonData(pokemon)
        );
        try {
          // Wait for all the promises to complete
          await Promise.all(pokemonDataPromises);

          console.log(this.filteredPokemonList);
          console.log(this.pokemonList);

          if (this.pokemonList.length > 1) {
            this.filteredPokemonList = this.pokemonList.slice();
            console.log(this.filteredPokemonList);
          }

          this.filterData();
        } catch (err) {
          console.error(err);
        }
      });
    } catch (err) {
      console.error(err);
    }
  }

  getPokemonData(pokemon: any): Promise<void> {
    const url = pokemon.url;

    return new Promise((resolve, reject) => {
      this.pokedex.getPokemonData(url).subscribe((res) => {
        const pokemonData = res;
        // Pad ID with leading zeroes
        const id = res.id.toString().padStart(3, '0');

        this.pokedex.getPokemonPicture(id).subscribe((blob: any) => {
          try {
            const objectURL = URL.createObjectURL(blob);
            pokemonData['img'] =
              this.sanitizer.bypassSecurityTrustUrl(objectURL);
            this.pokemonList.push(pokemonData);
            resolve();
          } catch (err) {
            reject(err);
          }
        }, reject);
      }, reject);
    });
  }

  getVisibleIndices(): number[] {
    const startIndex = this.paginator?.pageIndex * this.paginator?.pageSize;
    const endIndex = startIndex + this.paginator?.pageSize;
    return Array.from(
      { length: this.filteredPokemonList.length },
      (_, index) => index
    ).slice(startIndex, endIndex);
  }

  filterData(): void {
    const searchKeys = ['name', 'id'];
    if (!this.searchText) {
      this.filteredPokemonList = this.pokemonList.slice();
    } else {
      this.filteredPokemonList = this.pokemonList.filter((pokemon: any) =>
        searchKeys.some((key) =>
          pokemon[key]
            ?.toString()
            .toLowerCase()
            .includes(this.searchText.toLowerCase())
        )
      );
    }
  }

  sortByID() {
    this.idSort = true;
    this.nameSort = false;
    this.idAscending = !this.idAscending;

    if (this.idAscending)
      this.filteredPokemonList = this.pokemonList
        .slice()
        .sort((a: any, b: any) => b.id - a.id);
    else
      this.filteredPokemonList = this.pokemonList
        .slice()
        .sort((a: any, b: any) => a.id - b.id);
    console.log(this.filteredPokemonList);
  }

  sortByName() {
    this.nameSort = true;
    this.idSort = false;
    this.nameAscending = !this.nameAscending;
    console.log(this.filteredPokemonList);
    if (this.nameAscending)
      this.filteredPokemonList = this.pokemonList
        .slice()
        .sort((a: any, b: any) => {
          if (b.name > a.name) {
            return 1;
          } else if (b.name < a.name) {
            return -1;
          } else {
            return 0;
          }
        });
    else
      this.filteredPokemonList = this.pokemonList
        .slice()
        .sort((a: any, b: any) => {
          if (a.name > b.name) {
            return 1;
          } else if (a.name < b.name) {
            return -1;
          } else {
            return 0;
          }
        });

    console.log(this.filteredPokemonList);
  }
}
