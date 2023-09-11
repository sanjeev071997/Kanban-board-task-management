import React, { useState, useEffect } from 'react'
import Board from './Components/Board/Board';
import axios from 'axios';
import { message } from 'antd';
import { API } from './api';
import './App.css';
import BoardEditable from './Components/Editable/BoardEditable';

function App() {
  const [allBoard, setAllBoard] = useState([])
  
  //  Get All Board
  const allAddBoard = async () => {
    try {
      const res = await axios.get(`${API}/api/v1/addBoard`)
      if (res.data.success) {
        setAllBoard(res.data.data)
      }
    } catch (error) {
      message.error('Something Went Wrong')
    }
  }
  useEffect(() => {
    allAddBoard();
  }, [])

  return (
    <div className="app">
      <div className="app_navbar">
        <h3>Kanban Board Task Management</h3>
      </div>
      <div className="app_outer">
        <div className="app_boards">

          {allBoard.map((allBoard, item) => (
            <Board
              key={item._id}
              allBoard={allBoard}
            />
          ))}
          <div className='app_boards_board'>
            <BoardEditable />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
