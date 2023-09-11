import React, { useState, useEffect } from 'react'
import { X } from 'react-feather'
import axios from 'axios';
import { message } from 'antd';
import { API } from '../../api'
import './editable.css'

const Editable = (props) => {

    const [isEditable, setIsEditable] = useState(false)
    const [title, setTitle] = useState("");

    // Create todo 
    const handleAddTodo = async (event) => {
        event.preventDefault()
        const newTodo = {
            title,
            boardId: props.boardId
        }
        try {
            const res = await axios.post(`${API}/api/v1/todo`, newTodo)
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
                isEditable ?
                    <form className='editable_edit' onSubmit={props.updateCard || props.updateTask || handleAddTodo}>
                        {props.input || <input
                            autoFocus
                            type='text'
                            placeholder="Enter Card Title"
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            onClick={() => props.handUpdateTask}
                        />}
                        <div className='editable_edit_footer'>
                            <button type='submit'>{props.btn || "Add"}</button>
                            <X onClick={() => setIsEditable(false)} />
                        </div>
                    </form>
                    : <p className={' editable_display app_boards_board_add'} onClick={() => setIsEditable(true)}>{props.text || "Add Card"} </p>
            }
        </div>

    )
}

export default Editable