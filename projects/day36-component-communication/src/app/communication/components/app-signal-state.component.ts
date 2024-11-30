import { ChangeDetectionStrategy, Component, computed, inject } from "@angular/core";
import AppSignalStateGrandchildComponent from "./app-signal-state-grandchild.component";
import { SignalStateService } from "../services/signal-state.service";

@Component({
    selector: 'app-signal-state',
    imports: [AppSignalStateGrandchildComponent],
    template: `
    <h3>NgRx Signal State Component</h3>
    <div [class.enabled]="isEnabled()">
      <app-signal-state-grandchild />
    </div>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class AppSignalStateComponent {  
  isEnabled = computed(() => {
    const feature = this.service.feature();
    return feature?.isShown || false
  });

  service = inject(SignalStateService);
}
