import { HeroesComponent } from './heroes.component';
import { of } from 'rxjs/internal/observable/of';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let HEROES;
  let mockHeroService;

  beforeEach(() => {
    HEROES = [
      { id: 1, name: 'SpiderDude', strength: 8 },
      { id: 2, name: 'Wonderful Woman', strength: 24 },
      { id: 3, name: 'SuperDude', strength: 55 },
    ];

    // createSpyObj crea un mock de nuestro heroeService con los metodos que tiene el heroeService
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
    component = new HeroesComponent(mockHeroService);
  });

  describe('delete', () => {
    it('should remove the indicated hero from the heroes list', () => {
      // Crear un observable de angular
      mockHeroService.deleteHero.and.returnValue(of(true));

      component.heroes = HEROES;
      component.delete(HEROES[2]);
      expect(component.heroes.length).toBe(2);
    });
  });

  it('should call deleteHero method', () => {
    mockHeroService.deleteHero.and.returnValue(of(true));

    component.heroes = HEROES;
    component.delete(HEROES[2]);
    expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
  });

  // nota si ponemos una x antes del it, karma no ejecutara la prueba, ejem: xit
});
