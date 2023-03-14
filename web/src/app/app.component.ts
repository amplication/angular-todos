import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tasks: any[] = [];
  user: any;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.me().subscribe({ next: (user) => this.setUser(user) });
  }

  setUser(user: any) {
    this.user = user;
  }

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
