import { ChangeDetectionStrategy, Component, computed, inject, signal } from "@angular/core";
import { SignalStateService } from "../services/signal-state.service";

@Component({
  selector: 'app-signal-state-grandchild',
  standalone: true,
  template: `
    <h3>NgRx Signal State Grandchild Component</h3>
    <div>
      <p>Secret Value: {{ service.secretValue() }}</p>
      <p>{{ toggleText() }}</p>
      <button (click)="handleClicked()">Click Me!!!!</button>
    </div>
  `,
  styles: `
    :host {
      display: block;
      padding: 0.75rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AppSignalStateGrandchildComponent {
  service = inject(SignalStateService);
  toggleFeature = signal(false);

  toggleText = computed(() => {
    const click = this.toggleFeature() ? 'disable' : 'enable';
    return `Click the button to ${click} the signal state feature`;
  });

  handleClicked() {
    this.toggleFeature.set(!this.toggleFeature());
    this.service.setFeature({ 
      name: 'Signal State feature',
      isShown: this.toggleFeature()
    });
  }
}
