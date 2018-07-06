import { Component, OnInit } from '@angular/core';
import * as _ from 'underscore';

@Component({
  selector: 'app-algorithm-transposition',
  templateUrl: './algorithm-transposition.component.html',
  styleUrls: ['./algorithm-transposition.component.css']
})
export class AlgorithmTranspositionComponent implements OnInit {
  encryption: any = {};
  decryption: any = {};

  constructor() { }

  ngOnInit() {
  }

  encrypt(encryption) {
    // estimate we have a key
    // and we convert the key string to key array
    // since we have an array, then we place each letter from plaintext string
    const resultArray = _.map(encryption.key);
    const resultLetterNumberArray = [];
    const plaintextArray = [];

    for (let resultArrayIndex = 0; resultArrayIndex < resultArray.length; resultArrayIndex++) {
      plaintextArray[resultArrayIndex] = [];
      const charCode = resultArray[resultArrayIndex].charCodeAt(0);
      // tslint:disable-next-line:max-line-length
      resultLetterNumberArray[resultArrayIndex] = charCode - (65 <= charCode && charCode <= 90 ? 64 : 97 <= charCode && charCode <= 122 ? 96 : 0);

      for (let index = 0; index < encryption.plaintext.length; index++) {
        if (index === resultArrayIndex || index % (resultArray.length + resultArrayIndex)) {
          plaintextArray[resultArrayIndex].push(encryption.plaintext[index]);
        }
      }
    }
  }

}
