import React, { useState } from 'react'
import { X } from 'react-feather'
import axios from 'axios';
import { message } from 'antd';
import { API } from '../../api'
import './editable.css'

const BoardEditable = () => {
  const [showEdit, setShowEdit] = useState(false)
  const [name, setName] = useState("");

  // Add Board
  const handleAddBoard = async (event) => {
    event.preventDefault()
    const newBoard = {
      name,
    }
    try {
      const res = await axios.post(`${API}/api/v1/addBoard`, newBoard)
      if (res.data.success) {
        message.success(res.data.message);
        setTimeout(() => {
          window.location.replace('/')
      }, 1000);
      }
    } catch (error) {
      message.error('Something Went Wrong')
    }
  }

  return (
    <div className='editable'>
      {
        showEdit ?
          <form className='editable_edit' onSubmit={handleAddBoard}>
            <input
              autoFocus
              type='text'
              placeholder="Enter Board Name"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <div className='editable_edit_footer'>
              <button type='submit'>Add</button>
              <X onClick={() => setShowEdit(false)} />
            </div>
          </form>
          : <p className='editable_display app_boards_board_add' onClick={() => setShowEdit(true)}>Add Board</p>}
    </div>
  )
}

export default BoardEditable