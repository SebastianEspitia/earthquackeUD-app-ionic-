import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { PagesMapsEarthquakeComponent } from './pages-maps-earthquake.component';

describe('PagesMapsEarthquakeComponent', () => {
  let component: PagesMapsEarthquakeComponent;
  let fixture: ComponentFixture<PagesMapsEarthquakeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagesMapsEarthquakeComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PagesMapsEarthquakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
