import React, { useState, useEffect } from 'react'
import './board.css'
import { MoreHorizontal } from "react-feather"
import Card from '../Card/Card'
import Editable from '../Editable/Editable'
import Dropdown from '../Dropdown/Dropdown'
import { message } from 'antd'
import axios from 'axios';
import { API } from '../../api'

const Board = (props) => {
    const [showDropdown, setShowDropdown] = useState(false);
    // eslint-disable-next-line
    const [name, setName] = useState(props.allBoard?.name);
    // eslint-disable-next-line
    const [boardId, setBoardId] = useState(props.allBoard?._id);
    const [allCard, setAllCard] = useState([])

    // Delete Board
    const handleDelete = async () => {
        try {
            const res = await axios.delete(`${API}/api/v1/addBoard/delete/${boardId}`)
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

    // Get All Todo list
    const getCards = async () => {
        try {
            const res = await axios.get(`${API}/api/v1/todo/${boardId}`)
            if (res.data.success) {
                setAllCard(res.data.data)
            }
        } catch (error) {
            message.error('Something Went Wrong')
        }
    }

    useEffect(() => {
        getCards();
    }, [])

    return (
        <div className='board'>
            <div className='board_top'>
                <p className='board_top_title'>
                    {name}
                    <span> {allCard?.length} </span>
                </p>
                <div className='board_top_more'
                    onClick={() => setShowDropdown(true)}>
                    <MoreHorizontal />
                    {showDropdown && (
                        <Dropdown
                            onClose={() => setShowDropdown(false)}
                        >
                            <div className='board_dropdown'>
                                <p onClick={handleDelete}>Delete Board</p>
                            </div>
                        </Dropdown>
                    )}
                </div>
            </div>
            <div className='board_cards custom-scroll'>
                {allCard.map((allCard, item) => (
                    <Card key={item._id} allCard={allCard} boardId={boardId} />
                ))}
                <Editable boardId={boardId} />
            </div>
        </div>
    )
}

export default Board