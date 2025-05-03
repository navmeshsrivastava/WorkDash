import Task from './Task';

export default function Posts({ tasks }) {
  return (
    <>
      {tasks &&
        tasks.map((task) => <Task key={task._id.slice(-5)} task={task} />)}
    </>
  );
}
