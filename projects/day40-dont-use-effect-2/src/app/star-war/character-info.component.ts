import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Person } from './star-war.type';

@Component({
  selector: 'app-character-info',
  standalone: true,
  template: `
    @if(info(); as person) {
        <p>Id: {{ person.id }} </p>
        <p>Name: {{ person.name }}</p>
        <p>Height: {{ person.height }}</p>
        <p>Mass: {{ person.mass }}</p>
        <p>Hair Color: {{ person.hair_color }}</p>
        <p>Skin Color: {{ person.skin_color }}</p>
        <p>Eye Color: {{ person.eye_color }}</p>
        <p>Gender: {{ person.gender }}</p>
    } @else {
        <p>No info</p>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterInfoComponent {
    info = input<Person | undefined>(undefined);
}
