import { ChangeDetectionStrategy, Component, input, output, signal } from "@angular/core";
import { Feature } from "../types/feature.type";
import AppInputOutputGrandchildComponent from "./app-input-output-grandchild.component";

@Component({
  selector: 'app-input-output',
  standalone: true,
  imports: [AppInputOutputGrandchildComponent],
  template: `
    <h3>Input/Output Component</h3>
    <div [class.enabled]="isEnabled()">
      <app-input-output-grandchild [secretValue]="secretValue()" (featureFlag)="handleClicked($event)" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AppInputOutputComponent {
  secretValue = input.required<string>();
  isEnabled = signal(false);
  featureFlag = output<Feature>();

  handleClicked(value: Feature) {
    this.isEnabled.set(value.isShown);
    this.featureFlag.emit(value);
  }
}
