import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tasks: any[] = [];

  createTask(text: string) {
    return {
      id: this.tasks.length,
      text,
      completed: false,
    };
  }

  addTask(task: string) {
    const newTask = this.createTask(task);
    this.tasks.push(newTask);
  };

  completed(id: number) {
    const i = this.tasks.findIndex((t) => t.id === id);
    this.tasks[i].completed = !this.tasks[i].completed;
  };
}
