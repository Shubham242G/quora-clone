import React, { useState } from 'react'
import HomeIcon from '@material-ui/icons/Home';
import { AssignmentTurnedInOutlined, ExpandMore, FeaturedPlayListOutlined , NotificationsOutlined, PeopleAltOutlined, Search } from '@material-ui/icons';
import { Avatar, Button, Input } from '@material-ui/core';
import './css/quora_header.css';
import Modal from 'react-responsive-modal';
import CloseIcon from '@material-ui/icons/Close'
import 'react-responsive-modal/styles.css'
import axios from 'axios';
import { signOut} from 'firebase/auth';
import {auth} from '../firebase';
import { useDispatch } from 'react-redux';
import { logout } from '../feature/userSlice';
import { useSelector } from 'react-redux';
import { selectUser } from '../feature/userSlice';

function Quora_header() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputUrl, setInputUrl] = useState('');
  const [question, setQuestion] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(selectUser)
  const Close = (<CloseIcon/>)

  const handleLogout=()=>{
    if(window.confirm('Are you sure you want to log out?')){
    signOut(auth).then(()=>{
      dispatch(logout())
      console.log('Logged out')
    }).catch(()=>{
      console.log('error in logout')
    })
  }
}


  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(question !== ""){
      const config = {
        headers: {"Content-Type":"application/json"}
      }
      
      const body={
        questionName: question,
        questionUrl : inputUrl,
        user: user
      }
      await axios.post('/api/questions',body, config).then((res)=>{
        window.location.href = '/';
        console.log(res.data);
        setQuestion(res.data);
      }).catch((e)=>{
        console.log(e) 
      })
    }
  }
  return (
    <div className="qHeader">
      <div className="qHeader-content">
        <div className="qHeader__logo">
          <img
            src=""
            alt="logo"
          />
        </div>
        <div className="qHeader__icons">
          <div className="qHeader__icon">
            <HomeIcon />
          </div>
          <div className="qHeader__icon">
            <FeaturedPlayListOutlined />
          </div>
          <div className="qHeader__icon">
            <AssignmentTurnedInOutlined />
          </div>
          <div className="qHeader__icon">
            <PeopleAltOutlined />
          </div>
          <div className="qHeader__icon">
            <NotificationsOutlined />
          </div>
        </div>
        <div className="qHeader__input">
          <Search />
          <input type="text" placeholder="Search questions" />
        </div>
        <div className="qHeader__Rem">
          <span  onClick={handleLogout}>
            <Avatar src = {user.photo}/>
          </span>

          <Button onClick={()=>setIsModalOpen(true)}>Add Question</Button>
          <Modal open={isModalOpen} onClose={()=>setIsModalOpen(false)}  closeOnEsc center closeOnOverlayClick={false} closeIcon={Close}
                  styles={{overlay:{height:'auto'}}}>
            <div className='modal__title'>
              <h5>Add Question</h5>
              <h5>Share Link</h5>
            </div>
            <div className='modal__info'>
              <Avatar src={user.photo} className='avatar'/>
              <div className='modal__scope'>
                <PeopleAltOutlined/>
                <p>Public</p>
                <ExpandMore/>
              </div>
            </div>
            <div className='modal__field'>
              <Input onChange={(e)=> setQuestion(e.target.value)} style={{width: '55vw'}} type='text' placeholder="Start your question with 'What', 'How', 'Why' ,etc."/>
              <div style={{display:'flex',flexDirection:'column'}}>
                <input value={inputUrl} onChange={(e)=>setInputUrl(e.target.value)} style={{margin:'5px 0',border:'1px sold lightgray',padding:'10px',outline:'2px solid #000'}} type='text' placeholder='Optional: include a line that gives context'/>
                {
                  inputUrl !== '' && <img style={{height:'40vh', objectFit: 'contain'}} src={inputUrl} alt='displayImage'/>
                }
              </div>
            </div>
            <div className='modal__buttons'>
              <button className='cancel' onClick={()=>setIsModalOpen(false)}>Cancel</button>
              <button onClick={handleSubmit} className='add' type='submit'>Ad Question</button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  )
}

export default Quora_header
