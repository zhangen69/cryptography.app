/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AlgorithmVernamCipherComponent } from './algorithm-vernam-cipher.component';

describe('AlgorithmVernamCipherComponent', () => {
  let component: AlgorithmVernamCipherComponent;
  let fixture: ComponentFixture<AlgorithmVernamCipherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlgorithmVernamCipherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgorithmVernamCipherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
