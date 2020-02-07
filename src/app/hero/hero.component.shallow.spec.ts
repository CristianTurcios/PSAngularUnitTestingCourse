import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroComponent } from './hero.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('HeroComponent (sahllow test)', () => {
  // Al envolver nuestro componente dentro de component fixture
  //  podemos acceder a todas las propiedades y metodos que existen en herocomponent
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(() => {
    // Test bed lo que nos permite es ejecutar pruebas sobre el component y su plantilla juntos
    // Lo que hace es crear un modulo especial solo para pruebas identico al que creamos en el app.module.ts
    TestBed.configureTestingModule({
      declarations: [HeroComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });
    // Al usar no error schema, le decimos a angular que no emita un error cuando encuentre un atributo html no definido en su plantilla
    // en este caso que ignore el atributo routerLink que se usa en el html

    // Creamos nuestro hero componente y lo almacenamos en fixture
    fixture = TestBed.createComponent(HeroComponent);
  });

  it('should have the correct hero', () => {
    // En fixture.componentInstance tenemos la instancia real de nuestro hero component y
    // podemos asignar las variables y usar lo metodos dentro de el
    fixture.componentInstance.hero = { id: 1, name: 'SuperDude', strength: 3 };

    expect(fixture.componentInstance.hero.name).toEqual('SuperDude');
  });

  it('should render the hero name in an anchor tag', () => {
    fixture.componentInstance.hero = { id: 1, name: 'SuperDude', strength: 3 };
    // Con esta linea le podemos decir a angular que detecte los cambios y aplica los bindings al componente,
    // asi podemos tener los valores que le pasamos en la linea 33
    fixture.detectChanges();

    // al igual que con componentInstance tenemos acceso al componente (todo el ts)
    // con nativeElement tenemos acceso a la plantilla del componente y podemos hacer test de que se renderiza en la plantilla
    expect(fixture.nativeElement.querySelector('a').textContent).toContain('SuperDude');


    // Existe otro metodo para manipular el dom que es el debug element, la unica razon por la cual podriamos usar el debug element
    // es porque expone mas caracteristicas que podriamos utilizar para otros propositos, por ejemplo cuando testeamos directivas
    // podria usarse para testear el routerLink
    // nos puede proporcinar una instancia de un componente, y si obtenemos un elemento html,
    // este nos podria decir a que componente pertenece esa etiqueta html que capturo
    expect(fixture.debugElement.query(By.css('a')).nativeElement.textContent).toContain('SuperDude');
  });
});
