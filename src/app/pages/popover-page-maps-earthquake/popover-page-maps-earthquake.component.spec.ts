import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopoverPageMapsEarthquakeComponent } from './popover-page-maps-earthquake.component';

describe('PopoverPageMapsEarthquakeComponent', () => {
  let component: PopoverPageMapsEarthquakeComponent;
  let fixture: ComponentFixture<PopoverPageMapsEarthquakeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopoverPageMapsEarthquakeComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopoverPageMapsEarthquakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
