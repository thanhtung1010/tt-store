/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LangToggleComponent } from './lang-toggle';

describe('LangToggleComponent', () => {
  let component: LangToggleComponent;
  let fixture: ComponentFixture<LangToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LangToggleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LangToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
