import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [listofFriends, setListofFriends] = useState([]);

  const addFriend = () => {
    axios.post('https://mern-friendsapp.herokuapp.com/addfriend', {name: name, age: age})
      .then((response) => {
        setListofFriends([...listofFriends, {_id: response.data._id, name: name, age: age}]);
        // const update = prompt("Enter a val:  ");
        // console.log(update);
      })
  };
  useEffect(() => {
    axios.get('https://mern-friendsapp.herokuapp.com/read')
      .then((response) => {
        setListofFriends(response.data)
      })
      .catch(() => {
      console.log("error");
    })
  }, [])

  const updateFriend = (id) => {
    const newAge = prompt("Enter new age: ");

    axios.put('https://mern-friendsapp.herokuapp.com/update', {newAge: newAge, id: id})
      .then(() => {
        setListofFriends(listofFriends.map((val) => {
          return val._id === id ? {_id: id, name: val.name, age: newAge} : val;
        }))
      })
  }

  const deleteFriend = (id) => {
    axios.delete(`https://mern-friendsapp.herokuapp.com/delete/${id}`)
      .then(() => {
        setListofFriends(listofFriends.filter((val) => {
          return val._id !== id ;
        }))
      })
  }
  return (
    <div className="App">
      <div className="inputs">
        <input type="text" placeholder="Friend Name..." onChange={(event) => {setName(event.target.value)}}></input>
        <input type="number" placeholder="Friend's Age..." onChange={(event) => {setAge(event.target.value)}}></input>
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
            <button className="button" onClick={() => {updateFriend(val._id)}}>Update</button>
            <button className="button" id="removebtn" onClick={() => {deleteFriend(val._id)}}>DELETE</button>
          </div>
      )
      })}
      </div>
    </div>
  );
}

export default App;
