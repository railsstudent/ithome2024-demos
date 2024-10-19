import { ChangeDetectionStrategy, Component, computed, input, output, signal } from "@angular/core";
import { Feature } from "../types/feature.type";

@Component({
  selector: 'app-input-output-grandchild',
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
export default class AppInputOutputGrandchildComponent {
  secretValue = input.required<string>();
  toggleFeature = signal(false);
  title = 'Input/Output Grandchild Component';

  toggleText = computed(() => {
    const click = this.toggleFeature() ? 'disable' : 'enable';
    return `Click the button to ${click} the input/output feature`;
  });

  featureFlag = output<Feature>();

  handleClicked() {
    this.toggleFeature.set(!this.toggleFeature());
    this.featureFlag.emit({ 
      name: 'Input/Output feature',
      isShown: this.toggleFeature()
    });
  }
}
