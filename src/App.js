import ToDo from './components/todo/todo.js';
import './App.scss';
import UseSettings from "./context/Settings"
import Header from "./components/header/header.js";

function App() {
  return (

    <UseSettings>
      <div className="App">
        <Header />
        <ToDo />
      </div>
    </UseSettings>

  );
}

export default App;
