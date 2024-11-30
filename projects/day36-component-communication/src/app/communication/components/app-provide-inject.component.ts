import { ChangeDetectionStrategy, Component, computed, inject } from "@angular/core";
import AppProvideInjectGrandchildComponent from "./app-provide-inject-grandchild.component";
import { PROVIDE_INJECT_TOKEN } from "../provide-inject.constant";

@Component({
    selector: 'app-provide-inject-service',
    imports: [AppProvideInjectGrandchildComponent],
    template: `
    <h3>Provide/Inject Component</h3>
    <div [class.enabled]="isEnabled()">
      <app-provide-inject-grandchild />
    </div>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class AppProvideInjectComponent {  
  token = inject(PROVIDE_INJECT_TOKEN);
  isEnabled = computed(() => this.token.feature()?.isShown || false);
}
