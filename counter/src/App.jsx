import { useDispatch, useSelector } from 'react-redux';
import { increment } from './store/valueSlice';
import './App.css'

function App() {
  const stateDuStore = useSelector((state) => state);
  console.log("stateDuStore", stateDuStore)
  const dispatch = useDispatch();

  return (
    <div className="App">
    
      <h1>Counter</h1>
      <div className="card">
        <button onClick={() => dispatch(increment()) }>
          increment
        </button> <br />
          {stateDuStore.e.counter}
      </div>
    </div>
  )
}

export default App
