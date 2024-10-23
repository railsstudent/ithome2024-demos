import { ChangeDetectionStrategy, Component, output, signal } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { Data } from "../types/data.type";

@Component({
  selector: 'app-simple-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div>
      <h3>Add Map Key Form</h3>
      <form (ngSubmit)="add.emit({ name: this.data(), count: 1 })">
        <label for="data">
          <span>Data: </span>
          <input id="data" name="data" 
            [(ngModel)]="data" style="margin-right: 0.25rem;" />
        </label>
        <button type="submit" 
          style="margin-right: 0.25rem;" [disabled]="!this.data().trim()"  
        >Add</button>
        <button type="button" (click)="subtract.emit({ name: this.data(), count: -1 })"
          [disabled]="!this.data().trim()"
        >Subtract</button>
      </form>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AppSimpleFormComponent {  
  data = signal('');
  add = output<Data>();
  subtract = output<Data>();
}
