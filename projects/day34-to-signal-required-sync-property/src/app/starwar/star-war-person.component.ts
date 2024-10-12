import { ChangeDetectionStrategy, Component, HostAttributeToken, inject, input } from '@angular/core';
import { Person } from './person.type';

@Component({
  selector: 'app-star-war-person',
  standalone: true,
  template: `
    <p style="font-size: 1.1rem; font-style: italic;">{{ kind }}</p>
    <div style="border: 1px solid black; border-radius: 0.5rem; padding: 0.5rem; display: flex; justify-content: space-around; flex-wrap: wrap;">
      @let p = person();
      @if(p && p.name) {
        <p style="margin-right: 0.5rem;">Name: {{ p.name }}</p>
        <p style="margin-right: 0.5rem;">Height: {{ p.height }}</p>
        <p style="margin-right: 0.5rem;">Mass: {{ p.mass }}</p>
        <p style="margin-right: 0.5rem;">Hair Color: {{ p.hair_color }}</p>
        <p style="margin-right: 0.5rem;">Skin Color: {{ p.skin_color }}</p>
        <p style="margin-right: 0.5rem;">Eye Color: {{ p.eye_color }}</p>
        <p style="margin-right: 0.5rem;">Gender: {{ p.gender }}</p>
      } @else {
        <p>No info</p>
      }
    </div>   
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarWarPersonComponent {
  // required signal input
  person = input.required<Person>();

  kind = inject(new HostAttributeToken('kind'), { optional: true }) || 'Star War';    
}

