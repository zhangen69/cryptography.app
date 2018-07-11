import { Component, OnInit } from '@angular/core';
import * as _ from 'underscore';
import { createEmptyStateSnapshot } from '@angular/router/src/router_state';
import { SELECT_VALUE_ACCESSOR } from '@angular/forms/src/directives/select_control_value_accessor';
import { debug } from 'util';

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
    // let's estimate we have a key
    // and we convert the key string to key array
    // since we have an array, then we place each letter from plaintext string
    const keyArray = _.map(encryption.key);
    const resultLetterNumberArray = [];
    const plaintextArray = [];
    const sortedKeyArray = [];
    const baseNumberArray = [];

    baseNumberArray[keyArray.length - 1] = undefined;
    _.each(baseNumberArray, (n, i) => baseNumberArray[i] = i);

    // makes a matric from key string to key array
    _.each(keyArray, (key, keyArrayIndex) => {
      const charCode = keyArray[keyArrayIndex].charCodeAt(0);
      let count = 0;

      plaintextArray[keyArrayIndex] = {
        keyName: keyArray[keyArrayIndex],
        // tslint:disable-next-line:max-line-length
        key: resultLetterNumberArray[keyArrayIndex] = charCode - (65 <= charCode && charCode <= 90 ? 64 : (97 <= charCode && charCode <= 122 ? 96 : 0)),
        values: _.chain(encryption.plaintext).filter((p, i) => {
          if (count === keyArray.length) {
            count = 0;
            baseNumberArray[keyArrayIndex] += keyArray.length;
          }

          count++;

          if (i === baseNumberArray[keyArrayIndex]) {
            return p;
          }
        }).value()
      };
    });

    // sorting
    _.each(keyArray, () => {
      let smallestLetterNumber;

      _.each(resultLetterNumberArray, (currentNumber) => {
        const lastLetterNumber = sortedKeyArray[sortedKeyArray.length - 1];
        if (!!lastLetterNumber) {
          if (!smallestLetterNumber) {
            smallestLetterNumber = currentNumber;
          }

          if (smallestLetterNumber > currentNumber) {
            smallestLetterNumber = currentNumber;
          }
        } else if (!smallestLetterNumber) { // sortedKeyArray is empty array
          smallestLetterNumber = currentNumber;
        } else if (smallestLetterNumber > currentNumber) {
          smallestLetterNumber = currentNumber;
        }
      });

      sortedKeyArray.push(smallestLetterNumber);
      resultLetterNumberArray.splice(_.findIndex(resultLetterNumberArray, (n) => n === smallestLetterNumber), 1);
    });

    // get ciphertextArray from sortedKeyArray
    _.each(sortedKeyArray, (k) => {
      const selectedItem = _.find(plaintextArray, (item) => item.key === k);
      console.log(selectedItem);
      _.each(selectedItem.values, (v) => resultLetterNumberArray.push(v));
      plaintextArray.splice(_.findIndex(plaintextArray, (item) => item === selectedItem), 1);
    });

    encryption.ciphertext = resultLetterNumberArray.join('');

  }

  decrypt(decryption) {
    // let's estimate that we have a key and we convert the key string to key array
    // since we have an key array, then we place each letter from ciphertext string into the array
    const keyArray = _.map(decryption.key);
    const resultLetterNumberArray = [];
    const ciphertextArray = [];
    const sortedKeyArray = [];
    const baseNumberArray = [];

    baseNumberArray[keyArray.length - 1] = undefined;
    _.each(baseNumberArray, (n, i) => baseNumberArray[i] = i);

    // makes a matric from key string to key array
    _.each(keyArray, (key, keyArrayIndex) => {
      const charCode = keyArray[keyArrayIndex].charCodeAt(0);

      ciphertextArray[keyArrayIndex] = {
        keyName: keyArray[keyArrayIndex],
        // tslint:disable-next-line:max-line-length
        key: resultLetterNumberArray[keyArrayIndex] = charCode - (65 <= charCode && charCode <= 90 ? 64 : (97 <= charCode && charCode <= 122 ? 96 : 0)),
        originKeyIndex: keyArrayIndex,
        values: []
      };
    });

    // sorting
    _.each(keyArray, () => {
      let smallestLetterNumber;

      _.each(resultLetterNumberArray, (currentNumber) => {
        const lastLetterNumber = sortedKeyArray[sortedKeyArray.length - 1];
        if (!!lastLetterNumber) {
          if (!smallestLetterNumber) {
            smallestLetterNumber = currentNumber;
          }

          if (smallestLetterNumber > currentNumber) {
            smallestLetterNumber = currentNumber;
          }
        } else if (!smallestLetterNumber) { // sortedKeyArray is empty array
          smallestLetterNumber = currentNumber;
        } else if (smallestLetterNumber > currentNumber) {
          smallestLetterNumber = currentNumber;
        }
      });

      sortedKeyArray.push(smallestLetterNumber);
      resultLetterNumberArray.splice(_.findIndex(resultLetterNumberArray, (n) => n === smallestLetterNumber), 1);
    });


    const ciphertextArrayForTakeLetter = _.map(decryption.ciphertext);
    const numberForStatic = decryption.ciphertext.length % keyArray.length;
    let takeLetterLength = decryption.ciphertext.length / keyArray.length;

    // set ciphertextArray to sortedKeyArray
    _.each(sortedKeyArray, (k) => {
      const selectedItem = _.find(ciphertextArray, (item) => item.key === k);

      if (numberForStatic === 0) { // each
        for (let round = 0; round < (ciphertextArray.length % keyArray.length); round++) {
          selectedItem.values[round] = ciphertextArrayForTakeLetter[0];
          ciphertextArrayForTakeLetter.splice(0, 1);
        }
      } else {
        // tslint:disable-next-line:max-line-length
        const numberRepeat = Math.floor(((decryption.ciphertext.length / keyArray.length) - (Math.floor(decryption.ciphertext.length / keyArray.length))) * keyArray.length);
        takeLetterLength = Math.ceil(decryption.ciphertext.length / keyArray.length);

        if (selectedItem.originKeyIndex < numberRepeat) {
          for (let round = 0; round < takeLetterLength; round++) {
            selectedItem.values[round] = ciphertextArrayForTakeLetter[0];
            ciphertextArrayForTakeLetter.splice(0, 1);
          }
        } else {
          for (let round = 0; round < takeLetterLength - 1; round++) {
            selectedItem.values[round] = ciphertextArrayForTakeLetter[0];
            ciphertextArrayForTakeLetter.splice(0, 1);
          }
        }

        console.log(selectedItem);
      }
      // _.each(ciphertextArray, (item) => {
      //   if (item.key === k) {
      //     item = selectedItem;
      //   }
      // });
      // console.log(ciphertextArray);
    });

    // console.log(ciphertextArray);

    // let's sorting back to original
    _.each(_.sortBy(ciphertextArray, 'originKeyIndex'), (item, index) => {
      let count = 0;
      let valuePosition = index;

      for (let i = 0; i < decryption.ciphertext.length; i++) {
        if (count === keyArray.length) {
          count = 0;
          valuePosition += keyArray.length;
        }

        count++;

        if (i === valuePosition) {
          resultLetterNumberArray[valuePosition] = item.values[0];
          item.values.splice(0, 1);
        }
      }
    });

    // debugger;
    decryption.plaintext = resultLetterNumberArray.join('');

  }
}
