import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  @Input() tasks: any[] = [];
  @Output() completed = new EventEmitter<any>();
}
