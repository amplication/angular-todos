import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {
  @Output() addTask = new EventEmitter<string>();

  createTaskForm = this.fb.group({
    task: ''
  });

  constructor(private fb: FormBuilder) { }

  onSubmit() {
    if (!this.createTaskForm.valid) return;
    this.addTask.emit(this.createTaskForm.value.task as string);
    this.createTaskForm.reset();
  }
}
