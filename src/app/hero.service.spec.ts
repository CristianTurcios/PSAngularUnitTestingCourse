import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HeroService } from './hero.service';
import { MessageService } from './message.service';

describe('HeroService', () => {
  let mockMessageService;
  let httpTestingController: HttpTestingController;
  let service: HeroService;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(['add']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroService,
        {provide: MessageService, useValue: mockMessageService}
      ]
    });

    // Haciendo TestBed podemos hacer uso de la injection de dependencias, osea obtener una instancia de un servicio en mi archivo de prueba
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(HeroService);
  });

  describe('getHero', () => {

    it('should call get with the correct url', () => {
      // Este observable solo se va a ejecutar hasta que la linea 36 se ejecute, ya que es cuando realmente se va a realizar la llamada
      service.getHero(4).subscribe();

      // Se crea el request con la url que va a llamarse
      const req = httpTestingController.expectOne('api/heroes/4');
      // Se devuelve un valor
      req.flush({id: 4, name: 'SuperDude', strength: 100});
      // Se verifica que solo se hizo un llamado
      httpTestingController.verify();
    });
  });
});
