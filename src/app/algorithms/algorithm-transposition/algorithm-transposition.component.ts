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
    const ciphertextArray = [];

    _.each(encryption.plaintext, (letter, index) => {
      const plaintextLetter = encryption.plaintext[index];
      const keyLetter = encryption.key[index];

      const plaintextCharCode = plaintextLetter.charCodeAt();
      let keyCharCode = 0;

      if (!!keyLetter) {
        keyCharCode = keyLetter.charCodeAt();
      }

      this.setItemTo(ciphertextArray, plaintextCharCode, keyCharCode, true);
    });

    encryption.ciphertext = ciphertextArray.join('');
  }

  decrypt(decryption) {
    const plaintextArray = [];

    _.each(decryption.ciphertext, (letter, index) => {
      const ciphertextLetter = letter;
      const keyLetter = decryption.key[index];

      const ciphertextCharCode = ciphertextLetter.charCodeAt();
      let keyCharCode = 0;

      if (!!keyLetter) {
        keyCharCode = keyLetter.charCodeAt();
      }

      this.setItemTo(plaintextArray, ciphertextCharCode, keyCharCode, false);
    });

    decryption.plaintext = plaintextArray.join('');
  }

  setItemTo(targetArray, charCode, keyCharCode, isEncryption) {
    let baseCharCode = 65;

    if (65 <= charCode && charCode <= 90) {
      const keyLetterNumber = keyCharCode === 0 ? 0 : keyCharCode - baseCharCode + 1;
      const letterNumber = (charCode - baseCharCode + 1) + (isEncryption === true ? keyLetterNumber - 1 : -keyLetterNumber + 1);

      if (letterNumber > 26) {
        targetArray.push(String.fromCharCode(letterNumber - 26 + baseCharCode - 1));
      } else if (letterNumber < 1) {
        targetArray.push(String.fromCharCode(letterNumber + 26 + baseCharCode - 1));
      } else if (1 <= letterNumber && letterNumber <= 26) {
        targetArray.push(String.fromCharCode(letterNumber + baseCharCode - 1));
      }
    } else if (97 <= charCode && charCode <= 122) {
      baseCharCode = 97;
      const keyLetterNumber = keyCharCode === 0 ? 0 : keyCharCode - baseCharCode + 1;
      const letterNumber = (charCode - baseCharCode + 1) + (isEncryption === true ? keyLetterNumber - 1 : -keyLetterNumber + 1);

      if (letterNumber > 26) {
        targetArray.push(String.fromCharCode(letterNumber - 26 + baseCharCode - 1));
      } else if (letterNumber < 1) {
        targetArray.push(String.fromCharCode(letterNumber + 26 + baseCharCode - 1));
      } else if (1 <= letterNumber && letterNumber <= 26)  {
        targetArray.push(String.fromCharCode(letterNumber + baseCharCode - 1));
      }
    }
  }
}
