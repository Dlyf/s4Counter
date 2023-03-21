import { useDispatch, useSelector } from 'react-redux';
import { increment, counterAsync } from './store/valueSlice';
import './App.css'

function App() {
  // const stateDuStore = useSelector((state) => state);
  // console.log("stateDuStore", stateDuStore)
  // const dispatch = useDispatch();
  // const { number } = useSelector( state => state );
  const dispatch = useDispatch();
  const { number, parity } = useSelector( state => state.c );
  const { countA, active } = useSelector( state => state.ca );
// console.log("countA", countA)
  // useEffect(() => {
  //   dispatch(counterAsync(546))

  // }, [])

  return (
    <div className="App">

      <h1>Counter</h1>
      {/* <div className="card">
        <button onClick={() => dispatch(increment(2)) }>
          increment
        </button> <br />
        <p>{number}</p>
      </div> */}
       <div className="card">
        <p>{number}</p>
        <p>{parity}</p>
        <p>Counter Async {countA}</p>
        <button onClick={() => dispatch(increment(2))}>INCREMENT</button>
        <button disabled={!active} onClick={() => dispatch(counterAsync(1))}>INCREMENT</button>
      </div>
    </div>
  )
}

export default App
