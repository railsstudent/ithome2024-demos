import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core";
import { findMax } from "../find-max.util";

@Component({
  selector: 'app-signal-object',
  standalone: true,
  templateUrl: './map-data.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AppSignalObjectComponent {  
  store = input.required<{ map: Map<string, number> }>();

  mapData = computed(() => this.store().map);
  champ = computed(() => findMax(this.store().map));
  mostPopular = computed(() => this.champ()?.[0] || '');

  title = 'Signal is an Object with a Map';
}
