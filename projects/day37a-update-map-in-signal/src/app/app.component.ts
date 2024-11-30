import { ChangeDetectionStrategy, Component, computed, signal, VERSION } from '@angular/core';
import AppSignalMapDataComponent from './signals/components/signal-map-data.component';
import AppSignalObjectComponent from './signals/components/signal-object.component';
import { findMax } from './signals/find-max.util';
import { updateAndReturnMap } from './update-map.util';

const MY_MAP = new Map<string, number>();
MY_MAP.set('orange', 3);

@Component({
    selector: 'app-root',
    imports: [AppSignalObjectComponent, AppSignalMapDataComponent],
    template: `
    <h1>Hello from {{ name }}!</h1>
    <h2>Angular {{ version }} - {{ description }}</h2>
    <button (click)="addBanana()">Add banana</button>
    <button (click)="addBanana(-20)">Delete banana</button>
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
  name = 'iTHome Ironman 2024 day 37A';
  description = 'Update a Map in a Signal';

  aMap = signal<Map<string, number>>(new Map(MY_MAP), { equal: () => false });
  
  champ = computed(() => findMax(this.aMap()));

  store = signal({ map: new Map(MY_MAP) });
  aDeepCopyMap = signal<Map<string, number>>(new Map(MY_MAP));

  addBanana(count=10) {
    const data = { name: 'banana', count };
    this.aMap.update((prev) => updateAndReturnMap(prev, data));
    this.store.set({ map: updateAndReturnMap(this.store().map, data) });
    this.aDeepCopyMap.update((prev) => updateAndReturnMap(new Map(prev), data));
  }
}
