import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'pokedex';

  constructor(private pokedex: ApiService) {}

  ngOnInit() {
    this.pokedex.getDitto().subscribe((res) => console.log(res));
  }
}
