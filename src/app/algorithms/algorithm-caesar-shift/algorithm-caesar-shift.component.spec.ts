/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AlgorithmCaesarShiftComponent } from './algorithm-caesar-shift.component';

describe('AlgorithmCaesarShiftComponent', () => {
  let component: AlgorithmCaesarShiftComponent;
  let fixture: ComponentFixture<AlgorithmCaesarShiftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlgorithmCaesarShiftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgorithmCaesarShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
