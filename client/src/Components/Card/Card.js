import React, { useState, useEffect } from 'react'
import './card.css';
import { CheckSquare, Clock, List, MoreHorizontal } from "react-feather"
import Chip from '../Chip/Chip';
import Dropdown from '../Dropdown/Dropdown';
import { message } from 'antd'
import axios from 'axios';
import moment from 'moment'
import { API } from '../../api'
import CardInfo from './CardInfo/CardInfo';

const Card = ({ allCard, boardId, }) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [title, setTitle] = useState(allCard?.title)
  const [id, setId] = useState(allCard?._id)
  const [date, setDate] = useState(allCard?.date);
  const [card, setCard] = useState(allCard)
  const [labels, setLabels] = useState(allCard?.labels);
  const [color, setColor] = useState(allCard?.colors);
  const [allTask, setAllTask] = useState([])

  // Delete Card
  const handleDelete = async () => {
    try {
      const res = await axios.delete(`${API}/api/v1/todo/delete/${id}`)
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

  // Get All Task list
  const getTasks = async () => {
    try {
      const res = await axios.get(`${API}/api/v1/task/${id}`)
      if (res.data.success) {
        setAllTask(res.data.data)
      }
    } catch (error) {
      message.error('Something Went Wrong')
    }
  }

  useEffect(() => {
    getTasks();
  }, [])

  const calculatePercent = () => {
    if(allTask?.length==0)return "0"
    const complete = allTask?.filter(item=>item?.complete)?.length
    return complete
}

  return (
    <>
      {showModal && <CardInfo onClose={() => setShowModal(false)} title={title} id={id} card={card} boardId={boardId} />}
      <div className='card'>
        <div className='card_top'>
          <div className='card_top_labels'>
            {allCard?.labels?.map((item, index) => (
              <label key={index} >
                <Chip text={labels} color={color} />
              </label>
            ))}
          </div>
          <div className='card_top_more'
            onClick={() => setShowDropdown(true)}>
            <MoreHorizontal />
            {showDropdown && (
              <Dropdown
                onClose={() => setShowDropdown(false)}
              >
                <div className='card_dropdown'>
                  <p onClick={handleDelete}>Delete Card</p>
                </div>
              </Dropdown>
            )}
          </div>
        </div>
        <div className='card_title'>
          {title}
        </div>
        <div className='listCard'> <List  onClick={() => setShowModal(true)}/></div>
        <div className='card_footer'>
          {date && (
            <p  onClick={() => setShowModal(true)}> <Clock />  {moment(date).format('ll')}</p>
          )}
          <p  onClick={() => setShowModal(true)}> <CheckSquare /> {allTask?.length} / { calculatePercent()} </p>
        
        </div>
      </div>
    </>
  )
}

export default Card