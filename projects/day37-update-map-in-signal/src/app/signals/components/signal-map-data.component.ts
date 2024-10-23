import { ChangeDetectionStrategy, Component, computed, HostAttributeToken, inject, input } from "@angular/core";
import { findMax } from "../find-max.util";

@Component({
  selector: 'app-signal-map-data',
  standalone: true,
  templateUrl: './map-data.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AppSignalMapDataComponent {  
  mapData = input.required<Map<string, number>>();
  title = inject(new HostAttributeToken('title'), { optional: true }) || 'Signal';

  champ = computed(() => findMax(this.mapData()));
  
  mostPopular = computed(() => this.champ()?.[0] || '');
}
