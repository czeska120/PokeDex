<a id="readme-top"></a>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#optional-configuration">Installation</a></li>
      </ul>
    </li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>

  </ol>
</details>

## About The Project

PokeDex is a simple catalogue webpage where you can list and view details of the Pokemons utilizing the [PokeAPI][PokeAPI-url]. The following are implemented features:

- Search Pokemon by ID or Name
- Sort Pokemon by ID or Name
- View Pokemon by paginated listing
- View more details in a card
- View next and previous Pokemons on detailed card view

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![Angular][Angular.io]][Angular-url]
- [![Tailwind][Tailwind.io]][Tailwind-url]
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

### Prerequisites

NPM must be installed in your PC. To do this:

```sh
npm install npm@latest -g
```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/czeska120/PokeDex
   ```
2. Once inside the local copy of the repository, change directory to `frontend`

   ```sh
    cd frontend
   ```

3. Install NPM packages
   ```sh
   npm install
   ```
4. Run server using the command `ng serve`
   ```sh
   ng serve
   ```
   _Note: At first load, it may take a while to load the number of Pokemon. The current limit load is set to `30`._

### Optional Configuration

You may opt to change the limit of loaded Pokemon.

1. Navigate to the `api.service.ts` file.
2. Edit the limit number in the `getAllPokemon()` function. It is currently set to `30`.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Acknowledgments

These are the resources used for this project:

- [PokeAPI][PokeAPI-url]
- [Tailwind][Tailwind-url]
- [README.md file template][README-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Tailwind.io]: https://img.shields.io/badge/tailwindcss-0F172A?style=for-the-badge&logo=tailwindcss
[Tailwind-url]: https://tailwindcss.com/
[PokeAPI-url]: https://pokeapi.co/
[README-url]: https://github.com/othneildrew/Best-README-Template
