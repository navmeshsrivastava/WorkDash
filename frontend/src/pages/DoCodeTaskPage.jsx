import { formatDate } from '../helper';

export default function DoCodeTaskPage({ task }) {
  return (
    <>
      <h1>Do Coding Task Here</h1>
      <div>{task.title}</div>
      <div>{task.description}</div>
      <div>{formatDate(task.deadline)}</div>
      <div>{task.manager.role}</div>
      <div>{task.manager.email}</div>
      <div>{task.manager.name}</div>
    </>
  );
}
