import React, { useState, useContext } from 'react'
import TaskContext from '../contexts/Task'

function TaskList() {
  const emptyTask = {
    category: '', 
    name: '', 
    completed: false
  }
  const [newTask, setNewTask] = useState(false);
  const [task, setTask] = useState(emptyTask)
  const { tasks, addTask, updateTask } = useContext(TaskContext);

  const updateCompleted = taskItem => {
    taskItem.task.completed = !taskItem.task.completed;
    updateTask(taskItem);
  };

  const saveTask = () => {
    addTask(task).then(() => cancelTask())
  };

  const cancelTask = () => {
    setTask(emptyTask);
    setNewTask(false);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value })
  };

  return (
    <div className="TaskList">
      <button onClick={() => setNewTask(!newTask)}>+</button>
      <table>
      <thead>
        <tr>
          <th>Category</th>
          <th>Name</th>
          <th>Completed</th>
        </tr>
      </thead>
      <tbody>
        {
          newTask && (
            <tr>
              <td>
                <input type="text" value={task.category} onChange={handleChange} name="category"/>
              </td>
              <td>
                <input type="text" value={task.name} onChange={handleChange} name="name"/>
              </td>
              <td>
                <button disabled={task.name.length === 0 || task.category.length === 0 ? true : false} onClick={saveTask}>save</button> <br/>
                <button onClick={cancelTask}>cancel</button>
              </td>
            </tr>
          )
        }
        {
          tasks.map(taskItem => (
            <tr key={taskItem.id}>
              <td>{taskItem.task.category}</td>
              <td>{taskItem.task.name}</td>
              <td>
                <input
                  type="checkbox"
                  checked={taskItem.task.completed}
                  onChange={() => updateCompleted(taskItem)}
                />
              </td>
            </tr>
          ))
        }
      </tbody>
      </table>
    </div>
  );
}

export default TaskList;
