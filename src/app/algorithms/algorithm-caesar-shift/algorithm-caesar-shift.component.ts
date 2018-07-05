import { Component, OnInit } from '@angular/core';
import * as _ from 'underscore';
import { debug } from 'util';

@Component({
  selector: 'app-algorithm-caesar-shift',
  templateUrl: './algorithm-caesar-shift.component.html',
  styleUrls: ['./algorithm-caesar-shift.component.css']
})
export class AlgorithmCaesarShiftComponent implements OnInit {
  shiftType: any = 0;
  numberOfShift: any = 1;
  encryption: any = {
    shiftType: this.shiftType,
    numberOfShift: this.numberOfShift
  };
  decryption: any = {
    shiftType: this.shiftType,
    numberOfShift: this.numberOfShift
  };

  constructor() { }

  ngOnInit() {
  }

  encrypt(encryption) {
    encryption.ciphertext = this.formCharFrom(encryption, 'plaintext');
  }

  decrypt(decryption) {
    decryption.plaintext = this.formCharFrom(decryption, 'ciphertext');
  }

  formCharFrom(targetObject, targetParam) {
    return _.map(targetObject[targetParam], (letter) => { // form a array
      let letterCode = letter.charCodeAt();
      const baseCharCode = (65 <= letterCode && letterCode <= 90) ? 65 : ((97 <= letterCode && letterCode <= 122) ? 97 : 0);

      if (baseCharCode !== 0) { // :not(a-z) and :not(A-Z)
        letterCode -= (baseCharCode - 1);
        const cipherCode = this.getCharCodeFrom(targetObject, letterCode, targetParam === 'plaintext');
        return this.getCharFrom(cipherCode, baseCharCode);
      } else {
        return String.fromCharCode(letterCode);
      }
    }).join(''); // join string from array
  }

  getCharCodeFrom(targetObject, letterCode, isEncryption) {
    if ((targetObject.shiftType === 0 && isEncryption === true) || (targetObject.shiftType === 1 && isEncryption === true)) {
      letterCode -= targetObject.numberOfShift;
    } else if ((targetObject.shiftType === 0 && isEncryption === false) || (targetObject.shiftType === 1 && isEncryption === false)) {
      letterCode += targetObject.numberOfShift;
    }

    return letterCode;
  }

  getCharFrom(charCode, baseCharCode) {
    if (charCode > 26) {
      charCode -= 26;
    } else if (charCode <= 0) {
      charCode += 26;
    }

    return String.fromCharCode(charCode + (baseCharCode - 1));
  }

}
