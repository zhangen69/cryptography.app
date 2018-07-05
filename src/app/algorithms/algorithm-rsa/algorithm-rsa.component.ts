import { Component, OnInit } from '@angular/core';
import { debug } from 'util';

@Component({
  selector: 'app-algorithm-rsa',
  templateUrl: './algorithm-rsa.component.html',
  styleUrls: ['./algorithm-rsa.component.css']
})
export class AlgorithmRSAComponent implements OnInit {
  key: any = {};
  result: any = {};

  constructor() { }

  ngOnInit() {
  }

  calculate() {
    if (!this.isPrimeNumber(this.key.p) || !this.isPrimeNumber(this.key.q)) { // q and p must prime number
      alert('P and Q must prime number');
      return;
    }

    if (this.key.p === this.key.q) { // p != q
      alert('P and Q cannot be same');
      return;
    }

    const n = this.key.p * this.key.q;
    const g = (this.key.p - 1) * (this.key.q - 1);
    const d = this.xgcd(this.key.e, g)[0];

    if (!(1 < this.key.e && this.key.e < g)) { // 1 < e < g
      alert('E (Private Key) must more than 1 and less than (p-1) x (q-1)');
      return;
    }

    if (!((this.key.e * d) % g === 1)) { // (e * d) mod g = 1
      alert('The statement of "gcd((p-1) x (q-1), e) = 1" is incorrect');
      return;
    }

    // encrypt: c = (m^e) mod n
    const c = Math.pow(this.key.m, this.key.e) % n;
    // decrypt: m = (c^d) mod n
    const m = Math.pow(c, d) % n;

    this.result.ciphertext = c;
    this.result.plaintext = m;
    this.result.publicKey = d;
  }

  xgcd (a, b) {
    if (b === 0) {
      return [1, 0, a];
    }

    const temp = this.xgcd(b, a % b);
    const x = temp[0];
    const y = temp[1];
    const d = temp[2];

    // return d;
    return [y, x - y * Math.floor(a / b), d];
  }

  isPrimeNumber (number) {
    let prime = true;

    for (let i = 2; i <= Math.sqrt(number); i++) {
      if (number % i === 0) {
          prime = false;
          break;
      }
    }

    return prime && (number > 1);
  }

}
