import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [listofFriends, setListofFriends] = useState([]);

  const addFriend = () => {
    axios.post('http://localhost:3001/addfriend', {name: name, age: age})
      .then((response) => {
        setListofFriends([...listofFriends, {_id: response.data._id, name: name, age: age}]);
        // const update = prompt("Enter a val:  ");
        // console.log(update);
      })
  };
  useEffect(() => {
    axios.get('http://localhost:3001/read')
      .then((response) => {
        setListofFriends(response.data)
      })
      .catch(() => {
      console.log("error");
    })
  }, [])

  const updateFriend = (id) => {
    const newAge = prompt("Enter new age: ");

    axios.put('http://localhost:3001/update', {newAge: newAge, id: id})
      .then(() => {
        setListofFriends(listofFriends.map((val) => {
          return val._id === id ? {_id: id, name: val.name, age: newAge} : val;
        }))
      })
  }

  const deleteFriend = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`)
      .then(() => {
        setListofFriends(listofFriends.filter((val) => {
          return val._id !== id ;
        }))
      })
  }
  return (
    <div className="App">
      <div className="inputs">
        <input type="text" placeholder="Friend name..." onChange={(event) => {setName(event.target.value)}}></input>
        <input type="number" placeholder="Friend age..." onChange={(event) => {setAge(event.target.value)}}></input>
        <button onClick={addFriend}>Add Friend</button>
      </div>
      <div className="listofFriends">
      {listofFriends.map((val) => {
        return (
          <div className="friendContainer">
          <div className="friend"> 
            <h3><strong>Name: {val.name}</strong></h3> 
            <h3> Age: {val.age}</h3>
          </div>
            <button className="button" onClick={() => {updateFriend(val._id)}}>UPDATE</button>
            <button className="button" id="removebtn" onClick={() => {deleteFriend(val._id)}}>DELETE</button>
          </div>
      )
      })}
      </div>
    </div>
  );
}

export default App;