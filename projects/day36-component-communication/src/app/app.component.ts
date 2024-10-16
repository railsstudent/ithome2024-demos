import { ChangeDetectionStrategy, Component, computed, inject, signal, VERSION } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PROVIDE_INJECT_TOKEN } from './communication/provide-inject.constant';
import { NavbarComponent } from './navbar.component';
import { Feature } from './communication/types/feature.type';
import { navLinks } from './app.routes';
import { CommunicationService } from './communication/services/communication.service';
import { SignalStateService } from './communication/services/signal-state.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  template: `
    <h1>Hello from {{ name }}!</h1>
    <h2>Angular {{ version }} - {{ description }}</h2>
    <h3>The demos throws an error when the value is 5.</h3>
    <app-navbar [navLinks]="navLinks" />
    <p>Selected feature: {{ unifiedFeature() }}</p>
    <router-outlet (activate)="onActivate($event)" (deactivate)="onDeactivate()" />
  `,
  providers: [
    {
      provide: PROVIDE_INJECT_TOKEN,
      useValue: {
        secretValue: signal('provide-inject-secret'),
        feature: signal(null)
      }
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  version = VERSION.full;
  name = 'iTHome Ironman 2024 day 36';
  description = 'Use signals to communicate between components';
  navLinks = navLinks;
  feature = signal<string>('');
  communicationService = inject(CommunicationService);
  signalStateService = inject(SignalStateService);
  token = inject(PROVIDE_INJECT_TOKEN);

  unifiedFeature = computed(() => {
    const tokenFeature = this.token.feature();
    const tokenFeatureName = tokenFeature?.isShown ? tokenFeature.name : '';  

    return this.feature() || this.communicationService.featureName() || tokenFeatureName || this.signalStateService.featureName();
  })

  ngOnInit(): void {
    this.communicationService.setSecretValue('signal-in-a-service-secret');
    this.signalStateService.setSecretValue('signal-state-secret');
  }
  
  onActivate(component: any) {
    if (component.featureFlag) {
      component.featureFlag.subscribe((v: Feature) => {
        this.feature.set(v.isShown ? v.name : '');
      });
    }
  }

  onDeactivate() {
    this.token.feature.set(null);
    this.communicationService.setFeature(null);
    this.feature.set('');
    this.signalStateService.setFeature(null);
  }
}
