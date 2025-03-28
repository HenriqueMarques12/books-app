import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col items-center justify-center p-8">
      <div className="flex items-center justify-center gap-12 mb-8">
        <a 
          href="https://vite.dev" 
          target="_blank" 
          className="transition-transform hover:scale-110"
        >
          <img src={viteLogo} className="h-24 w-24" alt="Vite logo" />
        </a>
        <a 
          href="https://react.dev" 
          target="_blank"
          className="transition-transform hover:scale-110"
        >
          <img src={reactLogo} className="h-24 w-24 animate-spin-slow" alt="React logo" />
        </a>
      </div>
      
      <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 mb-8">
        Vite + React
      </h1>
      
      <div className="max-w-md w-full bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-700">
        <div className="flex flex-col items-center gap-4">
          <button 
            onClick={() => setCount((count) => count + 1)}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-blue-500/30 active:scale-95"
          >
            Count is {count}
          </button>
          
          <p className="text-gray-300 text-center">
            Edit <code className="bg-gray-700 px-2 py-1 rounded text-purple-400 font-mono">src/App.tsx</code> and save to test HMR
          </p>
        </div>
      </div>
      
      <p className="mt-10 text-gray-400 text-sm">
        Click on the Vite and React logos to learn more
      </p>
      
      <div className="mt-8 flex gap-4">
        <a 
          href="https://vitejs.dev/guide/" 
          className="px-4 py-2 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors border border-gray-700"
          target="_blank"
        >
          Vite Docs
        </a>
        <a 
          href="https://react.dev" 
          className="px-4 py-2 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors border border-gray-700"
          target="_blank"
        >
          React Docs
        </a>
      </div>
    </div>
  )
}

export default App
