import { ChangeDetectionStrategy, Component, computed, inject, signal } from "@angular/core";
import { PROVIDE_INJECT_TOKEN } from "../provide-inject.constant";

@Component({
  selector: 'app-provide-inject-grandchild',
  standalone: true,
  template: `
    <h3>Provide/Inject Grandchild Component</h3>
    <div>
      <p>Secret Value: {{ secretValue() }}</p>
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
export default class AppProvideInjectGrandchildComponent {
  toggleFeature = signal(false);
  token = inject(PROVIDE_INJECT_TOKEN);
  secretValue = computed(() => this.token.secretValue());

  toggleText = computed(() => {
    const click = this.toggleFeature() ? 'disable' : 'enable';
    return `Click the button to ${click} the provide/inject feature`;
  });

  handleClicked() {
    this.toggleFeature.set(!this.toggleFeature());
    this.token.feature.set({
      name: 'Provide/Inject feature',
      isShown: this.toggleFeature()
    });
  }
}
