import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudEditPage } from './crud-edit.page';

describe('CrudEditPage', () => {
  let component: CrudEditPage;
  let fixture: ComponentFixture<CrudEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudEditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
