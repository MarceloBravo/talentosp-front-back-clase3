import './App.css';
import { HeaderComponent } from './components/header/HeaderComponent';
import Navigation from './routes/Navigation';

function App() {
  return (
    <div className="App">
      <HeaderComponent />
      <Navigation/>
    </div>
  );
}

export default App;
