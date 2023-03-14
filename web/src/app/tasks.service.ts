import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const CREATE_TASK = gql`
  mutation createTask($data: TaskCreateInput!) {
    createTask(data: $data) {
      completed
      createdAt
      id
      text
    }
  }
`;

const GET_TASKS = gql`
  query tasks($where: TaskWhereInput, $orderBy: [TaskOrderByInput!]) {
    tasks(where: $where, orderBy: $orderBy) {
      completed
      createdAt
      id
      text
    }
  }
`;

const UPDATE_TASK = gql`
  mutation updateTask($data: TaskUpdateInput!, $where: TaskWhereUniqueInput!) {
    updateTask(data: $data, where: $where) {
      completed
      createdAt
      id
      text
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private apollo: Apollo) { }

  create(text: string, uid: string) {
    return this.apollo
      .mutate({
        mutation: CREATE_TASK,
        variables: {
          data: {
            completed: false,
            text,
            uid: { id: uid },
          },
        },
      })
      .pipe(
        catchError(() => of()),
        map(({ data }: any) =>
          data ? data.createTask : alert('Could not create task')
        )
      );
  }

  getAll(uid: string) {
    return this.apollo
      .query({
        query: GET_TASKS,
        variables: {
          where: { uid: { id: uid } },
          orderBy: { createdAt: 'Asc' },
        },
      })
      .pipe(
        catchError(() => of()),
        map(({ data }: any) => {
          if (!data) {
            alert('Could not get tasks');
            return [];
          }

          return data.tasks;
        })
      );
  }

  update(task: any) {
    return this.apollo
      .mutate({
        mutation: UPDATE_TASK,
        variables: {
          data: {
            completed: !task.completed,
          },
          where: {
            id: task.id,
          },
        },
      })
      .pipe(
        catchError(() => of()),
        map(({ data }: any) =>
          data ? data.updateTask : alert('Could not update task')
        )
      );
  }
}
