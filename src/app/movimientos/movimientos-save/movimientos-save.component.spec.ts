import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientosSaveComponent } from './movimientos-save.component';

describe('MovimientosSaveComponent', () => {
  let component: MovimientosSaveComponent;
  let fixture: ComponentFixture<MovimientosSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovimientosSaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovimientosSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
