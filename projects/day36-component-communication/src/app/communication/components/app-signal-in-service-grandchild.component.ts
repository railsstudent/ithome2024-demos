import { ChangeDetectionStrategy, Component, computed, inject, signal } from "@angular/core";
import { CommunicationService } from "../services/communication.service";

@Component({
  selector: 'app-signal-in-service-grandchild',
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
export default class AppSignalInServiceGrandchildComponent {
  communicationService = inject(CommunicationService);
  toggleFeature = signal(false);
  secretValue = this.communicationService.secretValue;
  title = 'Signal in a Service Grandchild Component';

  toggleText = computed(() => {
    const click = this.toggleFeature() ? 'disable' : 'enable';
    return `Click the button to ${click} the signal in a service feature`;
  });

  handleClicked() {
    this.toggleFeature.set(!this.toggleFeature());
    this.communicationService.setFeature({ 
      name: 'Signal in a Service feature',
      isShown: this.toggleFeature()
    });
  }
}
