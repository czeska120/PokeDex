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
  pokemonDetails: any;
  pokemonWeakness: any[] = [];

  // Sort by ID & Name
  idSort = false;
  idAscending = false;
  nameSort = false;
  nameAscending = false;

  // Modal
  isModalOpen = false;

  constructor(private pokedex: ApiService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.viewPokemon();
  }

  viewPokemon() {
    try {
      this.pokedex.getAllPokemon().subscribe(async (res) => {
        var list = res.results;
        const pokemonDataPromises = list.map((pokemon: any) =>
          this.getPokemonData(pokemon)
        );
        try {
          // Wait for all the promises to complete
          await Promise.all(pokemonDataPromises);

          if (this.pokemonList.length > 1) {
            this.filteredPokemonList = this.pokemonList.slice();
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
      this.pokedex.getPokemonData(url).subscribe({
        next: (res) => {
          const pokemonData = res;
          // Pad ID with leading zeroes
          const id = res.id.toString().padStart(3, '0');

          this.pokedex.getPokemonPicture(id).subscribe({
            next: (blob: any) => {
              const objectURL = URL.createObjectURL(blob);
              pokemonData['img'] =
                this.sanitizer.bypassSecurityTrustUrl(objectURL);
              this.pokemonList.push(pokemonData);
              resolve();
            },
            error: (err) => {
              reject(err);
            },
          });
        },
        error: (err) => {
          reject(err);
        },
      });
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
  }

  sortByName() {
    this.nameSort = true;
    this.idSort = false;
    this.nameAscending = !this.nameAscending;
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
  }

  cardDetails(key: any) {
    this.toggleModal(true);
    this.pokemonDetails = null;
    this.pokedex.getPokemonDetails(key).subscribe({
      next: (res) => {
        this.pokemonDetails = res;
        const id = this.pokemonDetails.id.toString().padStart(3, '0');

        this.pokedex.getPokemonPicture(id).subscribe({
          next: (blob: any) => {
            const objectURL = URL.createObjectURL(blob);
            this.pokemonDetails['img'] =
              this.sanitizer.bypassSecurityTrustUrl(objectURL);
            this.findWeakness(this.pokemonDetails.types);
          },
          error: (err) => {
            console.error(err);
          },
          complete: () => {
            console.log('Picture fetching complete');
          },
        });
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        console.log('Fetching Pokemon details complete');
      },
    });
  }

  findWeakness(types: any[]) {
    this.pokemonWeakness = [];
    types.forEach((type) => {
      var name = type.type.name;
      switch (name) {
        case 'normal':
          {
            this.pokemonWeakness.push('rock');
            this.pokemonWeakness.push('ghost');
            this.pokemonWeakness.push('steel');
          }
          break;
        case 'fighting':
          {
            this.pokemonWeakness.push('flying');
            this.pokemonWeakness.push('poison');
            this.pokemonWeakness.push('psychic');
            this.pokemonWeakness.push('bug');
            this.pokemonWeakness.push('ghost');
            this.pokemonWeakness.push('fairy');
          }
          break;
        case 'flying':
          {
            this.pokemonWeakness.push('rock');
            this.pokemonWeakness.push('steel');
            this.pokemonWeakness.push('electric');
          }
          break;
        case 'poison':
          {
            this.pokemonWeakness.push('poison');
            this.pokemonWeakness.push('ground');
            this.pokemonWeakness.push('rock');
            this.pokemonWeakness.push('ghost');
            this.pokemonWeakness.push('steel');
          }
          break;
        case 'ground':
          {
            this.pokemonWeakness.push('flying');
            this.pokemonWeakness.push('bug');
            this.pokemonWeakness.push('grass');
          }
          break;
        case 'rock':
          {
            this.pokemonWeakness.push('fighting');
            this.pokemonWeakness.push('ground');
            this.pokemonWeakness.push('steel');
          }
          break;
        case 'bug':
          {
            this.pokemonWeakness.push('fighting');
            this.pokemonWeakness.push('flying');
            this.pokemonWeakness.push('poison');
            this.pokemonWeakness.push('ghost');
            this.pokemonWeakness.push('steel');
            this.pokemonWeakness.push('fire');
            this.pokemonWeakness.push('fairy');
          }
          break;
        case 'ghost':
          {
            this.pokemonWeakness.push('normal');
            this.pokemonWeakness.push('dark');
          }
          break;
        case 'steel':
          {
            this.pokemonWeakness.push('steel');
            this.pokemonWeakness.push('fire');
            this.pokemonWeakness.push('water');
            this.pokemonWeakness.push('electric');
          }
          break;
        case 'fire':
          {
            this.pokemonWeakness.push('rock');
            this.pokemonWeakness.push('fire');
            this.pokemonWeakness.push('water');
            this.pokemonWeakness.push('dragon');
          }
          break;
        case 'water':
          {
            this.pokemonWeakness.push('water');
            this.pokemonWeakness.push('grass');
            this.pokemonWeakness.push('dragon');
          }
          break;
        case 'grass':
          {
            this.pokemonWeakness.push('flying');
            this.pokemonWeakness.push('poison');
            this.pokemonWeakness.push('bug');
            this.pokemonWeakness.push('steel');
            this.pokemonWeakness.push('fire');
            this.pokemonWeakness.push('grass');
            this.pokemonWeakness.push('dragon');
          }
          break;

        case 'electric':
          {
            this.pokemonWeakness.push('ground');
            this.pokemonWeakness.push('grass');
            this.pokemonWeakness.push('electric');
            this.pokemonWeakness.push('dragon');
          }
          break;
        case 'psychic':
          {
            this.pokemonWeakness.push('steel');
            this.pokemonWeakness.push('psychic');
            this.pokemonWeakness.push('dark');
          }
          break;
        case 'ice':
          {
            this.pokemonWeakness.push('steel');
            this.pokemonWeakness.push('fire');
            this.pokemonWeakness.push('water');
            this.pokemonWeakness.push('ice');
          }
          break;
        case 'dragon':
          {
            this.pokemonWeakness.push('steel');
            this.pokemonWeakness.push('fairy');
          }
          break;
        case 'dark':
          {
            this.pokemonWeakness.push('fighting');
            this.pokemonWeakness.push('dark');
            this.pokemonWeakness.push('fairy');
          }
          break;
        case 'fairy':
          {
            this.pokemonWeakness.push('poison');
            this.pokemonWeakness.push('steel');
            this.pokemonWeakness.push('fire');
          }
          break;
        default:
          console.log('none');
      }
    });
    // Filter any redundant weakness
    this.pokemonWeakness = this.pokemonWeakness.filter(
      (value, index) => this.pokemonWeakness.indexOf(value) === index
    );
  }

  onNext(id: number) {
    if (this.pokemonList.length != id) id++;
    this.cardDetails(id);
  }
  onPrevious(id: number) {
    if (1 != id) id--;
    this.cardDetails(id);
  }

  toggleModal(isModalOpen: boolean) {
    if (isModalOpen != null) this.isModalOpen = isModalOpen;
    else this.isModalOpen = !this.isModalOpen;
  }
}
