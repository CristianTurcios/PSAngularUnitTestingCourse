import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
import { of } from 'rxjs/internal/observable/of';
import { By } from '@angular/platform-browser';
import { HeroComponent } from '../hero/hero.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HeroesComponent (shallow tests)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;

  beforeEach(() => {
    HEROES = [
      { id: 1, name: 'SpiderDude', strength: 8 },
      { id: 2, name: 'Wonderful Woman', strength: 24 },
      { id: 3, name: 'SuperDude', strength: 55 },
    ];
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    TestBed.configureTestingModule({
      declarations: [
        HeroesComponent,
        HeroComponent
      ],
      providers: [
        { provide: HeroService, useValue: mockHeroService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(HeroesComponent);
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
  });

  it('should render each hero as a HeroComponent', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    // run ngOnInit
    fixture.detectChanges();

    // De esta forma podemos saber cuantas directivas de un componente se han renderizado dentro de heroes component
    const heroComponentDebbugingElements = fixture.debugElement.queryAll(By.directive(HeroComponent));
    expect(heroComponentDebbugingElements.length).toEqual(3);
    for (let index = 0; index < heroComponentDebbugingElements.length; index++) {
      expect(heroComponentDebbugingElements[index].componentInstance.hero).toEqual(HEROES[index]);
    }
  });

  it(`should call heroService.deleteHero when the Hero Component's delete button is clicken`, () => {
    // mira si el metodo delete se llama dentro del componente
    spyOn(fixture.componentInstance, 'delete');
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
    // asi
    // De esta forma podemos simular el click en algun html
    heroComponents[0].query(By.css('button')).triggerEventHandler('click', { stopPropagation: () => {}});

    // o
    // (<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);

    // o asi
    // heroComponents[0].triggerEventHandler('delete', null);
    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  });

  it('should add a new hero to the hero list when the add button is clicked', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    const name = 'Mr. Ice';
    mockHeroService.addHero.and.returnValue(of({id: 5, name: name, strength: 4}));
    // Obtenemos la referencia al input
    const inputElement =  fixture.debugElement.query(By.css('input')).nativeElement;
    const addButton = fixture.debugElement.queryAll(By.css('button'))[0];
    // asignandole simulamos que el usuario introdujo el texto
    inputElement.value = name;
    addButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
    expect(heroText).toContain(name);
  });
});
