import { ChangeDetectionStrategy, Component, computed, inject, Injector, linkedSignal, signal } from '@angular/core';
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
      @let data = personMovies();
      <app-character-info [info]="data.person" />
      <app-character-films [films]="data.films" />
    </div>
    <app-character-picker (newSearchId)="id.set($event)" />  
  `,
  styles: `
    :host {
      display: block;
      font-size: 1.5rem;
      padding: 1rem;
      --main-font-size: 1.25rem;
    }

    .border {
      border: 1px solid black; 
      border-radius: 0.5rem; 
      padding: 1rem; 
      margin-bottom: 1rem;

      color: var(--main-color);
      font-size: var(--main-font-size);
    }
  `,
  host: {
    '[style.--main-color]': 'rgb()',
    '[style.--main-font-size]': 'fontSize()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterComponent {
  id = signal(-1);
  injector = inject(Injector);

  personMovies = createRxResourceComputed<number, OptionalPersonFilmsTuple, PersonFilms>(this.id, 
    personFilmsLoader(this.injector),
    personFilmsComputed
  )

  rgb = linkedSignal({
    source: () => this.id,
    computation: (source) => {
      console.log('rgb id', source());
      return generateRGBCode();
    }
  })  

  fontSize = computed(() => this.id() % 2 === 0 ? '1.25rem' : '1.75rem');
}
