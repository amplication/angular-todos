import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tasks: any[] = [];
  user: any;

  constructor(private auth: AuthService, private ts: TasksService) { }

  ngOnInit(): void {
    this.auth.me().subscribe({ next: (user) => this.setUser(user) });
  }

  setUser(user: any) {
    this.user = user;
    if (!user) return;
    this.ts.getAll(user.id).subscribe({
      next: (tasks: any[]) => (this.tasks = [...tasks]),
    });
  }

  addTask(task: string) {
    this.ts.create(task, this.user.id).subscribe({
      next: (newTask: any) => {
        if (!newTask) return;
        this.tasks.push(newTask);
      },
    });
  }

  completed(task: any) {
    this.ts.update(task).subscribe({
      next: (updatedTask: any) => {
        if (!updatedTask) return;
        const i = this.tasks.findIndex((t) => t.id === updatedTask.id);
        this.tasks[i] = updatedTask;
      },
    });
  };
}
