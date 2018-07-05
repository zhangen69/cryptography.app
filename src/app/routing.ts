import { Routes } from '@angular/router';
import { AlgorithmTranspositionComponent } from './algorithms/algorithm-transposition/algorithm-transposition.component';
import { AlgorithmCaesarShiftComponent } from './algorithms/algorithm-caesar-shift/algorithm-caesar-shift.component';
import { AlgorithmRSAComponent } from './algorithms/algorithm-rsa/algorithm-rsa.component';

export const routes: Routes = [
  { path: 'transposition', component: AlgorithmTranspositionComponent },
  { path: 'caesarshift', component: AlgorithmCaesarShiftComponent },
  { path: 'rsa', component: AlgorithmRSAComponent },
];
