import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigErrorComponent } from './config-error.component';
import { MatIconModule } from '@angular/material/icon';

describe('ConfigErrorComponent', () => {
  let component: ConfigErrorComponent;
  let fixture: ComponentFixture<ConfigErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigErrorComponent],
      imports: [MatIconModule]
    });
    fixture = TestBed.createComponent(ConfigErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
