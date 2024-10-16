import { ChangeDetectionStrategy, Component, computed, inject } from "@angular/core";
import { CommunicationService } from "../services/communication.service";
import AppSignalInServiceGrandchildComponent from "./app-signal-in-service-grandchild.component";

@Component({
  selector: 'app-signal-in-service',
  standalone: true,
  imports: [AppSignalInServiceGrandchildComponent],
  template: `
    <h3>Signal in a Service Component</h3>
    <div [class.enabled]="isEnabled()">
      <app-signal-in-service-grandchild />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AppSignalInServiceComponent {  
  isEnabled = computed(() => {
    const feature = this.communicationService.feature();
    return feature?.isShown || false
  });

  communicationService = inject(CommunicationService);
}
