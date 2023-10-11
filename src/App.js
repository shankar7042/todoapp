import { useState, useEffect } from "react";
import "./App.css";
// import Todoinput from './components/Todoinput';
// import TodoList from './components/TodoList';
import GroupInput from "./components/GroupInput";
import GroupList from "./components/GroupList";
import StatusList from "./components/StatusList";

function App() {
  // }
  // const deleteListItem = (key) => {
  //   let newListTodo = [...listTodo];
  //   newListTodo.splice(key, 1);
  //   setListTodo([...newListTodo])
  // }

  const [groupList, setGroupList] = useState([
    { inputFrom: "1", inputTo: "4" },
    { inputFrom: "5", inputTo: "10" },
  ]);
  // Add Group
  let addGroup = (inputFrom, inputTo) => {
    if (inputFrom !== "") {
      if (inputTo !== "") {
        let groupData = {
          inputFrom: parseInt(inputFrom, 10),
          inputTo: parseInt(inputTo, 10),
        };
        // console.log(groupData);
        setGroupList([...groupList, groupData]);
      } else {
        alert("Group End Value Empty");
      }
    } else {
      alert("Group start Value Empty");
    }
  };
  const deleteGroup = (key) => {
    let newGroup = [...groupList];
    newGroup.splice(key, 1);
    setGroupList([...newGroup]);
  };

  const [apiData, setApiData] = useState([]);

  let showStatus = (groupList) => {
    // groupList.forEach((listItem, index) => {
    for (let j = 0; j < groupList.length; j++) {
      // console.log(index);
      for (let i = groupList[j].inputFrom; i <= groupList[j].inputTo; i++) {
        fetch(`https://jsonplaceholder.typicode.com/todos/` + i)
          .then((response) => {
            return response.json();
          })
          .then((actualData) => {
            setApiData((prevState) => [
              ...prevState,
              {
                group: j,
                id: actualData.id,
                title: actualData.title,
                completed: actualData.completed,
              },
            ]);
          });
      }
    }
    console.log(apiData);
  };

  return (
    <>
      <div className="task-group">
        <GroupInput addGroup={addGroup} />

        <div className="groups-div">
          <p>My Groups</p>
          <hr />
          <div className="all-groups">
            {groupList.map((listItem, i) => {
              return (
                <GroupList
                  key={i}
                  inputFrom={listItem.inputFrom}
                  inputTo={listItem.inputTo}
                  deleteGroup={deleteGroup}
                />
              );
            })}
          </div>
          <button
            className="show-status-btn"
            onClick={() => {
              showStatus(groupList);
            }}
          >
            Show Status
          </button>
        </div>
      </div>

      <div className="task-status">
        <p>Group Status List</p>
        <hr />
        <div className="task-list">
          {apiData.map((item, i) => {
            return (
              <StatusList
                key={i}
                group={item.group}
                status={item.completed}
                id={item.id}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
