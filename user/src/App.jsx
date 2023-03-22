import { useDispatch, useSelector } from "react-redux";
import { userAsync, deleteUser } from "./store/userSlice";
import "./App.css";
import { useState } from "react";

function App() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.ua);
  const { userB } = useSelector((state) => state.uc);
  const [ isToggle, setIsToggle ] = useState(false);

  function isToggleButton() {
    setIsToggle(!isToggle)
    if (userB.length === 0) { dispatch(userAsync()) }
  }
  console.log("userBB", userB)

  console.log("users", users);
  const handleDelete = id => dispatch(deleteUser(id)) ;

  return (
    <div className="App">
      <h1>user</h1>
      <div className="card">
        <button onClick={() => dispatch(userAsync())}>Button</button>
        <button onClick={isToggleButton}>Button</button>
        <br />
        <br />
        <div>
          {users.length > 0 &&
            users.map((user) => (
              <li key={user.id}>
                {user.name}, {user.phone}
                <button onClick={() => handleDelete(user.id)}>X</button>

                <br />
                <br />
              </li>
          ))}
        </div>
        <div>
          { isToggle &&
            userB.map((user) => (
              <span key={user.id}>
                {user.username.length} + {user.name.length} =
                {user.username.length + user.name.length}
                <br />
                <br />
              </span>
            )) }
        </div>
      </div>
    </div>
  );
}

export default App;
