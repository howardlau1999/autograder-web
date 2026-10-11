import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { SubmissionsTableModule } from '../../submissions-table.module';
import { FilesTableComponent } from './files-table.component';

describe('FilesTableComponent', () => {
  let component: FilesTableComponent;
  let fixture: ComponentFixture<FilesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmissionsTableModule],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(FilesTableComponent);
    component = fixture.componentInstance;
    component.uploadEntries = of({});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
