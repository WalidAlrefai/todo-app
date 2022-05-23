import ToDo from './components/todo/todo.js';
import './App.scss';
import UseSettings from "./context/Settings"
import Header from "./components/header/header.js";
import DisplayContext from './context/DisplayCompleted.js';
import LoginContext from './context/LoginContext';

function App() {
  return (
    <LoginContext>
      <DisplayContext>
        <UseSettings>
          <div className="App">
            <Header />
            <ToDo />
          </div>
        </UseSettings>
      </DisplayContext>
    </LoginContext>
  );
}

export default App;
