import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerDetallesGuitarraPage } from './ver-detalles-guitarra.page';

describe('VerDetallesGuitarraPage', () => {
  let component: VerDetallesGuitarraPage;
  let fixture: ComponentFixture<VerDetallesGuitarraPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerDetallesGuitarraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
