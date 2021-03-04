import React, {useEffect, useContext} from 'react'
import './App.css';
import TaskContext from './contexts/Task'
import TaskList from './components/TaskList';

function App() {
  const { getTasks } = useContext(TaskContext);
  
  useEffect(() => {
    getTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <div className="App">
      <header className="App-header">
        <h3>My Tasks</h3>
        <TaskList />
      </header>
    </div>
  );
}

export default App;
