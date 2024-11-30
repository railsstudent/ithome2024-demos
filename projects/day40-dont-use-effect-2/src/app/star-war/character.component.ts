import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CharacterFilmsComponent } from './character-films.component';
import { CharacterInfoComponent } from './character-info.component';
import { CharacterPickerComponent } from './character-picker.component';
import { generateRGBCode } from './generate-rgb';
import { personFilmsComputed, personFilmsLoader } from './resources/person-movies.resource';
import { OptionalPersonFilmsTuple, PersonFilms } from './star-war.type';
import { createRxResourceComputed } from './utils/resource-computed';

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [CharacterInfoComponent, CharacterFilmsComponent, CharacterPickerComponent],
  template: `
    <h3>Display the 83 Star War Characters</h3>
    <div class="border">
      <app-character-info [searchId]="id()" [info]="personMovies().person" />
      <app-character-films [films]="personMovies().films" />
    </div>
    <app-character-picker (newSearchId)="id.set($event)" />  
  `,
  styleUrl: './character.component.css',
  host: {
    '[style.--main-color]': 'state().rgb',
    '[style.--main-font-size]': 'state().fontSize',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterComponent {
  id = signal(-1);
  http = inject(HttpClient);

  personMovies = createRxResourceComputed<number, OptionalPersonFilmsTuple, PersonFilms>(this.id, 
    personFilmsLoader(this.http),
    personFilmsComputed
  )

  state = computed(() => ({ 
    fontSize: this.id() % 2 === 0 ? '1.25rem' : '1.75rem',
    rgb: generateRGBCode(),
  }));
}
