import { Routes } from '@angular/router';
import { AlgorithmTranspositionComponent } from './algorithms/algorithm-transposition/algorithm-transposition.component';
import { AlgorithmCaesarShiftComponent } from './algorithms/algorithm-caesar-shift/algorithm-caesar-shift.component';
import { AlgorithmRSAComponent } from './algorithms/algorithm-rsa/algorithm-rsa.component';
import { AlgorithmVernamCipherComponent } from './algorithms/algorithm-vernam-cipher/algorithm-vernam-cipher.component';

export const routes: Routes = [
  { path: 'transposition', component: AlgorithmTranspositionComponent },
  { path: 'caesarshift', component: AlgorithmCaesarShiftComponent },
  { path: 'vernamcipher', component: AlgorithmVernamCipherComponent },
  { path: 'rsa', component: AlgorithmRSAComponent },
];
