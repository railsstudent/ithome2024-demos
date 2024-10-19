import { ChangeDetectionStrategy, Component, computed, inject, signal } from "@angular/core";
import { PROVIDE_INJECT_TOKEN } from "../provide-inject.constant";

@Component({
  selector: 'app-provide-inject-grandchild',
  standalone: true,
  templateUrl: './grand-child.component.html',
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
  title = 'Provide/Inject Grandchild Component';

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
