import ToDo from './components/todo/todo.js';
import './App.scss';
import UseSettings from "./context/Settings"
import Header from "./components/header/header.js";
import DisplayContext from './context/DisplayCompleted.js';

function App() {
  return (
    <DisplayContext>
      <UseSettings>
        <div className="App">
          <Header />
          <ToDo />
        </div>
      </UseSettings>
    </DisplayContext>
  );
}

export default App;
