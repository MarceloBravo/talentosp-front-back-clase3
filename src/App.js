import './App.css';
import { BrowserRouter } from 'react-router';
import { HeaderComponent } from './components/header/HeaderComponent';
import Navigation from './routes/Navigation';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <HeaderComponent />
        <Navigation/>
      </div>
    </BrowserRouter>
  );
}

export default App;
