import { TestBed } from '@angular/core/testing';

import { Guitarra } from './guitarra';

describe('Guitarra', () => {
  let service: Guitarra;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Guitarra);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
