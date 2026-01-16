import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QuestionnaireProvider } from './context/QuestionnaireContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Wizard from './pages/Wizard';
import Completion from './pages/Completion';

function App() {
  return (
    <BrowserRouter>
      <QuestionnaireProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/wizard" element={<Wizard />} />
            <Route path="/completion" element={<Completion />} />
          </Routes>
        </Layout>
      </QuestionnaireProvider>
    </BrowserRouter>
  );
}

export default App;
