import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to StyleSense</h1>
        <p className="mb-6 text-gray-700">
          Your private AI fashion assistant is ready to help you build confidence in your style.
        </p>
        <a
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          Learn React
        </a>
      </div>
    </div>
  );
}

export default App;
