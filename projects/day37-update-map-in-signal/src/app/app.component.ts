import { ChangeDetectionStrategy, Component, computed, signal, VERSION } from '@angular/core';
import AppSimpleFormComponent from './signals/components/app-simple-form.component';
import AppSignalObjectComponent from './signals/components/signal-object.component';
import { Data } from './signals/types/data.type';
import AppSignalMapDataComponent from './signals/components/signal-map-data.component';
import { findMax } from './signals/find-max.util';
import { updateAndReturnMap } from './update-map.util';

@Component({
    selector: 'app-root',
    imports: [AppSimpleFormComponent, AppSignalObjectComponent, AppSignalMapDataComponent],
    template: `
    <h1>Hello from {{ name }}!</h1>
    <h2>Angular {{ version }} - {{ description }}</h2>
    <app-simple-form (add)="updateMaps($event)" 
      (subtract)="updateMaps($event)" />
    <div>
      <p>aMap and champ works in the current component because the equal function always returns false</p>
      @for (entry of aMap(); track entry[0]) {
        <p>{{ entry[0] }} - {{ entry[1] }}</p>
      }
      <p>Most Popular: {{ champ()?.[0] || '' }}</p>
    </div>
    <app-signal-map-data [mapData]="aMap()" title='It does not work because the map reference does not change.' />
    <app-signal-map-data [mapData]="aDeepCopyMap()" title='Signal with a new map' />
    <app-signal-object [store]="this.store()" />
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  version = VERSION.full;
  name = 'iTHome Ironman 2024 day 37';
  description = 'Signal pitfalls with Map';

  aMap = signal<Map<string, number>>(new Map<string, number>(), 
    { equal: () => false });
  champ = computed(() => findMax(this.aMap()));

  store = signal({ map: new Map<string, number>() });
  aDeepCopyMap = signal<Map<string, number>>(new Map<string, number>());

  updateMaps(data: Data) {
    this.aMap.update((prev) => updateAndReturnMap(prev, data));
    this.store.set({ map: updateAndReturnMap(this.store().map, data) });
    this.aDeepCopyMap.update((prev) => updateAndReturnMap(new Map(prev), data));
  }
}