import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

// Material
import { MatPaginatorModule } from '@angular/material/paginator';

// NPM Modules
import { NgIconsModule } from '@ng-icons/core';
import * as MaterialIconsOutline from '@ng-icons/material-icons/outline';
import * as MaterialIconsRound from '@ng-icons/material-icons/round';
import * as MaterialIconsSharp from '@ng-icons/material-icons/sharp';

// Pages
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule,
    CommonModule,
    FormsModule,
    MatPaginatorModule,
    NgIconsModule.withIcons({
      ...MaterialIconsOutline,
      ...MaterialIconsRound,
      ...MaterialIconsSharp,
    }),
  ],
  providers: [provideAnimations(), provideHttpClient(withInterceptorsFromDi())],
})
export class AppModule {}
