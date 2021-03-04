import React, { createContext, useState } from 'react';
import {fbAddTask, fbGetTasks, fbUpdateTask} from '../services/firebase';


const TaskContext = createContext();
export default TaskContext;

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  async function getTasks() {
    await fbGetTasks().then(response => {
      setTasks(response);
    });
  };

  async function addTask(task) {
    await fbAddTask(task).then(response => {
      // Response is the task ID
      if (response) setTasks([
        ...tasks,
        { id: response, task }
      ]);
    });
  }

  async function updateTask(taskItem) {
    await fbUpdateTask(taskItem).then(() => {
      setTasks(prevTasks => {
        return prevTasks.map(
          task => (task.id === taskItem.id) ? taskItem : task
        );
      });
    });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks: tasks,
        getTasks,
        addTask,
        updateTask
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
