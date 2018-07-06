import { Component, OnInit } from '@angular/core';
import * as _ from 'underscore';

@Component({
  selector: 'app-algorithm-vernam-cipher',
  templateUrl: './algorithm-vernam-cipher.component.html',
  styleUrls: ['./algorithm-vernam-cipher.component.css']
})
export class AlgorithmVernamCipherComponent implements OnInit {
  encryption: any = {};
  decryption: any = {};

  constructor() { }

  ngOnInit() {
  }

  encrypt(encryption) {
    encryption.ciphertext = this.formCharFrom(encryption, true);
  }

  decrypt(decryption) {
    decryption.plaintext = this.formCharFrom(decryption, false);
  }

  formCharFrom(target, isEncryption) {
    return _.map(target[isEncryption === true ? 'plaintext' : 'ciphertext'], (letter, index) => {
      const keyLetter = target.key[index];
      const textCharCode = letter.charCodeAt(0);
      let keyCharCode = 0;

      if (!(65 <= textCharCode && textCharCode <= 90) && !(97 <= textCharCode && textCharCode <= 122)) {
        return letter;
      }

      if (!!keyLetter) {
        keyCharCode = keyLetter.charCodeAt(0);
      }

      return this.getCharFrom(textCharCode, keyCharCode, isEncryption);
    }).join('');
  }

  getCharFrom(charCode, keyCharCode, isEncryption) {
    let baseCharCode = 65;
    let keyLetterNumber = 0;

    if (65 <= keyCharCode && keyCharCode <= 90) {
      keyLetterNumber = keyCharCode - 64;
    } else if (97 <= keyCharCode && keyCharCode <= 122) {
      keyLetterNumber = keyCharCode - 96;
    }

    if (97 <= charCode && charCode <= 122) {
      baseCharCode = 97;
    }

    const letterNumber = (charCode - baseCharCode + 1) + (isEncryption === true ? keyLetterNumber - 1 : -keyLetterNumber + 1);
    charCode = letterNumber + baseCharCode - 1;

    if (letterNumber > 26) {
      charCode -= 26;
    } else if (letterNumber < 1) {
      charCode += 26;
    }

    return String.fromCharCode(charCode);
  }

}
