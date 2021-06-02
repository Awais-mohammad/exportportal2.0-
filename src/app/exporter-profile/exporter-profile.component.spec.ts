import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExporterProfileComponent } from './exporter-profile.component';

describe('ExporterProfileComponent', () => {
  let component: ExporterProfileComponent;
  let fixture: ComponentFixture<ExporterProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExporterProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExporterProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
