import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AlgorithmTranspositionComponent } from './algorithms/algorithm-transposition/algorithm-transposition.component';
import { routes } from './routing';
import { AlgorithmCaesarShiftComponent } from './algorithms/algorithm-caesar-shift/algorithm-caesar-shift.component';
import { AlgorithmRSAComponent } from './algorithms/algorithm-rsa/algorithm-rsa.component';
import { AlphaOnlyDirective } from './directives/alpha-only.directive';
import { UppercaseDirective } from './directives/uppercase.directive';
import { AlgorithmVernamCipherComponent } from './algorithms/algorithm-vernam-cipher/algorithm-vernam-cipher.component';

@NgModule({
  declarations: [
    AppComponent,
    AlgorithmVernamCipherComponent,
    AlgorithmTranspositionComponent,
    AlgorithmCaesarShiftComponent,
    AlgorithmRSAComponent,
    AlphaOnlyDirective,
    UppercaseDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
