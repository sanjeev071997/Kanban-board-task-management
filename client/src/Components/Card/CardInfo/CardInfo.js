import React, { useState, useEffect } from 'react'
import { List, Type, Calendar, Tag, CheckSquare, Trash, Edit, CheckCircle, CloudSnow } from 'react-feather'
import axios from 'axios';
import { message } from 'antd';
import { API } from '../../../api';
import Modal from '../../Modal/Modal'
import Editable from "../../Editable/Editable"
import moment from 'moment'
import './cardInfo.css'
import Chip from '../../Chip/Chip';

const CardInfo = (props) => {
    console.log(props.allTask);
    const color = [
        "#a8193d",
        "#4fcc25",
        "#1ebffa",
        "#8da377",
        "#9975bd",
        "#cf61a1",
        "#240959",
    ];
    const [cardId, setCardId] = useState(props.id);
    const [boardId, setBoardId] = useState(props.boardId);
    const [updateTitle, setUpdateTitle] = useState(props.title);
    const [updateDesc, setUpdateDesc] = useState(props?.card?.desc);
    const [date, setDate] = useState(props?.card?.date);
    const [labels, setLabels] = useState(props?.card?.labels);
    const [addColor, setAddColor] = useState(props?.card?.colors);
    const [activeColor, setActiveColor] = useState(addColor);
    const [newTask, setNewTask] = useState([]); //props.task
    const [allTask, setAllTask] = useState([])
    localStorage.setItem('color', JSON.stringify(activeColor));

    // Update Card
    const handleUpdate = async (e) => {
        const newTodo = {
            title: updateTitle,
            desc: updateDesc,
            date: date,
            labels: labels,
            colors: activeColor
        }
        e.preventDefault();
        try {
            const res = await axios.put(`${API}/api/v1/todo/${cardId}`, newTodo,);

            if (res.data.success) {
                message.success(res.data.message)
                setTimeout(() => {
                    window.location.replace('/')
                }, 1000);
            };

        } catch (error) {
            message.error('Something Went Wrong')
        }
    };

    // Update New Task
    const updateNewTask = async (e) => {
        const newTaskTodo = {
            task: newTask,
            cardId: cardId,
            boardId: boardId
        }
        e.preventDefault();
        try {
            const res = await axios.post(`${API}/api/v1/task`, newTaskTodo,);

            if (res.data.success) {
                message.success(res.data.message)
                setTimeout(() => {
                    window.location.replace('/')
                }, 1000);
            };

        } catch (error) {
            message.error('Something Went Wrong')
        }
    };

    // Get All Task list
    const getTasks = async () => {
        try {
            const res = await axios.get(`${API}/api/v1/task/${cardId}`)
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
        // let task = allTask?.task
        if(allTask?.length==0)return "0"
        const complete = allTask?.filter(item=>item?.complete)?.length

        return (complete/allTask?.length)*100 + ""
    }

    // Complete Task
    const handleDone = async (id) => {
        try {
            const res = await axios.put(`${API}/api/v1/task/complete/${id}`);
            if (res.data.success) {
                message.success(res.data.message)
                setTimeout(() => {
                    window.location.replace('/')
                }, 1000);
            };
        } catch (error) {
            message.error('Something Went Wrong')
        }
    };


    // delete Task
    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`${API}/api/v1/task/delete/${id}`)
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
        <div>
            <Modal onClose={() => props.onClose()} >
                <div className='cardinfo'>
                    <div className='cardinfo_box'>
                        <div className='cardinfo_box_title'>
                            <Type />
                            Title
                        </div>
                        <div className='cardinfo_box_body'>
                            <Editable text={updateTitle} btn={"Set Title"}
                                updateCard={handleUpdate} input={<input type='text' placeholder="Enter Title" value={updateTitle} onChange={(e) => setUpdateTitle(e.target.value)} required />}
                            />
                        </div>
                    </div>

                    <div className='cardinfo_box'>
                        <div className='cardinfo_box_title'>
                            <List />
                            Description
                        </div>
                        <div className='cardinfo_box_body'>
                            <Editable
                                text={updateDesc || 'Your description here'}
                                btn={"Set Description"}
                                updateCard={handleUpdate}
                                input={<input autoFocus type='text' placeholder="Your description here" defaultValue={updateDesc} value={updateDesc} onChange={(e) => setUpdateDesc(e.target.value)} required />}
                            />
                        </div>
                    </div>

                    <div className='cardinfo_box'>
                        <div className='cardinfo_box_title'>
                            <Calendar />
                            Date
                        </div>
                        <div className='cardinfo_box_body'>
                            <Editable
                                text={date && (moment(date).format('ll')) || 'Your date here'}
                                btn={"Set Date"}
                                updateCard={handleUpdate}
                                input={<input autoFocus type='date' defaultValue={date} value={date} onChange={(e) => setDate(e.target.value)} required />}
                            />
                        </div>
                    </div>

                    <div className='cardinfo_box cardDate'>
                        <div className='cardinfo_box_title'>
                            <Tag />
                            Labels
                        </div>
                        <div className='cardinfo_box_labels'>
                            <Chip close onClose={() =>
                                console.log("chip close")}
                                color={activeColor}
                                text={labels}
                            />
                        </div>
                        <div className='cardinfo_box_colors'>
                            {color.map((item, index) => (
                                <li key={index} style={{ backgroundColor: item }}
                                    className={item === activeColor ? "active" : ""}
                                    onClick={() => setActiveColor(item)}
                                />
                            ))}
                        </div>
                        <div className='cardinfo_box_body'>
                            <Editable
                                text={'Add Label'}
                                btn={"Add Label"}
                                updateCard={handleUpdate}
                                input={<input autoFocus type='text' placeholder="Your labels here" value={labels} onChange={(e) => setLabels(e.target.value)} required />}
                            />
                        </div>
                    </div>

                    <div className='cardinfo_box cardDate'>
                        <div className='cardinfo_box_title'>
                            <CheckSquare />
                            Tasks
                        </div>
                        <div className='cardinfo_box_progress-bar'>
                            <div className='cardinfo_box_progress' style={{ width: calculatePercent()+"%" }} />
                        </div>
                        <div className='cardinfo_box_list'>
                            {allTask.map((task, index) => (
                                <div className='cardinfo_task' key={index}>
                                    <>
                                        <CheckCircle onClick={() => { handleDone(task._id) }} />
                                        {task.complete ? <p>{task.task}</p> : <p style={{ textDecoration: 'line-through', fontWeight: '500' }}>{task.task}</p>}
                                        <Trash onClick={() => { handleDelete(task._id) }} />
                                    </>
                                </div>
                            ))}
                        </div>
                        <div className='cardinfo_box_body'>
                            <Editable
                                text={'Add New Task'}
                                btn={"Add New Task"}
                                updateTask={updateNewTask}
                                input={<input autoFocus type='text' placeholder="Enter New Task" value={newTask} onChange={(e) => setNewTask(e.target.value)} required />}
                            />
                        </div>
                    </div>

                </div>
            </Modal>
        </div>
    )
}

export default CardInfo