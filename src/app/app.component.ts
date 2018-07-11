import { Component } from '@angular/core';
import * as _ from 'underscore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  app = '';
  encryption: any = {};
  decryption: any = {};

  changeTo(viewName) {
    this.app = viewName;
    this.encryption = {};
    this.decryption = {};

    if (viewName === 'caesarshift') {
      this.encryption.shiftType = '0';
      this.encryption.numberOfShift = 1;
      this.decryption.shiftType = '0';
      this.decryption.numberOfShift = 1;
    }
  }

  encryptWithTransposition(encryption) {
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

  decryptWithTransposition(decryption) {
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
    const ciphertextArrayForTakeLetterLength = ciphertextArrayForTakeLetter.length;
    const numberForStatic = ciphertextArrayForTakeLetterLength % keyArray.length;
    let takeLetterLength = decryption.ciphertext.length / keyArray.length;
    const updatedCiphertextArray = Object.assign({}, ciphertextArray);

    // set ciphertextArray to sortedKeyArray
    for (let i = 0; i < sortedKeyArray.length; i++) {
      const k = sortedKeyArray[i];
      const selectedItem = _.find(ciphertextArray, (item) => item.key === k && item.values.length === 0);

      if (numberForStatic === 0) { // each
        for (let round = 0; round < (ciphertextArrayForTakeLetterLength / keyArray.length); round++) {
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

        // updatedCiphertextArray.push(selectedItem);
        console.log(selectedItem);
        // ciphertextArray.splice(_.findIndex(ciphertextArray, (item) => item.key === k && item.values.length === 0), 1);
      }
    }

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

  encryptWithVernam(encryption) {
    encryption.ciphertext = this.formCharFromWithVernam(encryption, true);
  }

  decryptWithVernam(decryption) {
    decryption.plaintext = this.formCharFromWithVernam(decryption, false);
  }

  encryptWithCaesar(encryption) {
    encryption.ciphertext = this.formCharFromWithCaesar(encryption, 'plaintext');
  }

  decryptWithCaesar(decryption) {
    decryption.plaintext = this.formCharFromWithCaesar(decryption, 'ciphertext');
  }

  formCharFromWithCaesar(targetObject, targetParam) {
    return _
      .map(targetObject[targetParam], letter => {
        // form a array
        let letterCode = letter.charCodeAt();
        const baseCharCode =
          65 <= letterCode && letterCode <= 90
            ? 65
            : 97 <= letterCode && letterCode <= 122
              ? 97
              : 0;

        if (baseCharCode !== 0) {
          // :not(a-z) and :not(A-Z)
          letterCode -= baseCharCode - 1;
          const cipherCode = this.getCharCodeFromWithCaesar(
            targetObject,
            letterCode,
            targetParam === 'plaintext'
          );
          return this.getCharFromWithCaesar(cipherCode, baseCharCode);
        } else {
          return String.fromCharCode(letterCode);
        }
      })
      .join(''); // join string from array
  }

  getCharCodeFromWithCaesar(targetObject, letterCode, isEncryption) {
    if (
      (targetObject.shiftType === '0' && isEncryption === true) ||
      (targetObject.shiftType === '1' && isEncryption === false)
    ) {
      letterCode -= targetObject.numberOfShift;
    } else if (
      (targetObject.shiftType === '1' && isEncryption === true) || (targetObject.shiftType === '0' && isEncryption === false)
    ) {
      letterCode += targetObject.numberOfShift;
    }

    return letterCode;
  }

  getCharFromWithCaesar(charCode, baseCharCode) {
    if (charCode > 26) {
      charCode -= 26;
    } else if (charCode <= 0) {
      charCode += 26;
    }

    return String.fromCharCode(charCode + (baseCharCode - 1));
  }

  formCharFromWithVernam(target, isEncryption) {
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

      return this.getCharFromWithVernam(textCharCode, keyCharCode, isEncryption);
    }).join('');
  }

  getCharFromWithVernam(charCode, keyCharCode, isEncryption) {
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
