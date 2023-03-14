import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import qs from 'qs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(private http: HttpClient) { }

  create(text: string, uid: string) {
    const url = new URL('/api/tasks', environment.apiUrl).href;
    return this.http
      .post(url, { completed: false, text, uid: { id: uid } })
      .pipe(
        catchError(() => of(null)),
        map((result: any) => (result ? result : alert('Could not create task')))
      );
  }

  getAll(uid: string) {
    const query = qs.stringify({
      where: { uid: { id: uid } },
      orderBy: { createdAt: 'asc' },
    });
    const url = new URL(`/api/tasks?${query}`, environment.apiUrl).href;
    return this.http.get(url).pipe(
      catchError(() => of(null)),
      map((result: any) => {
        if (!result) {
          alert('Could not get tasks');
          return [];
        }

        return result;
      })
    );
  }

  update(task: any) {
    const url = new URL(`/api/tasks/${task.id}`, environment.apiUrl).href;
    return this.http.patch(url, { completed: !task.completed }).pipe(
      catchError(() => of(null)),
      map((result: any) => (result ? result : alert('Could not update task')))
    );
  }
}
