import { TestBed } from '@angular/core/testing';

import { Integracion } from './integracion';

describe('Integracion', () => {
  let service: Integracion;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Integracion);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
