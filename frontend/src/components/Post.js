import { Avatar } from '@material-ui/core';
import { ArrowDownwardOutlined, ArrowUpwardOutlined, ChatBubbleOutlineOutlined, MoreHorizOutlined, RepeatOneOutlined, ShareOutlined } from '@material-ui/icons';
import React ,{useState}from 'react';
import './css/post.css';
import Modal from 'react-responsive-modal';
import CloseIcon from '@material-ui/icons/Close'
import 'react-responsive-modal/styles.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import ReactTimeAgo from 'react-time-ago';
import axios from 'axios';
import ReactHtmlParser from 'html-react-parser';
import { useSelector } from 'react-redux';
import { selectUser } from '../feature/userSlice';



function Post({post}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const Close = (<CloseIcon/>)
    const [answer, setAnswer] = useState('');
    const user = useSelector(selectUser);
    const handleQuill=(value)=>{
        setAnswer(value);
    }

    const handleSubmit= async ()=>{
        if(post._id && answer !== ""){
            const config = {
                headers:{
                    'Content-Type':'application/json'
                }
            }

            const body = {
                answer: answer,
                questionId: post._id,
                user: user,
            }
            await axios.post('/api/answers' ,body ,config).then((res)=>{
                console.log(res.data)
                setIsModalOpen(false);
                window.location.href = '/'
            }).catch((e)=>{
                console.log(e);
            })
        }
    }


    function LastSeen({date}){
        return(
            <div>
                Last Seen: <ReactTimeAgo date={date} locale='en-US' timeStyle='round'/>
            </div>
        )
    }
  return (
      <div className='post'>
          <div className='post__info'>
              <Avatar src={post.photoURL} />
              <h4>{post.userName}</h4>
              <small><LastSeen date={post.createdAt}/></small>
          </div>
          <div className='post__body'>
              <div className="post__question">
                <p>
                      {post.questionName}
                </p>
                      <button onClick={() => setIsModalOpen(true)} className='post__btnAnswer'>Answer</button>
                      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} closeOnEsc center closeOnOverlayClick={false} closeIcon={Close}
                          styles={{ overlay: { height: 'auto' } }}>
                          <div className='modal__question'>
                              <h1>{post.questionName}</h1>
                              <p>asked by {''}<span className='name'>{post.userName}</span> on{''} <span className='name'>{new Date(post.createdAt).toLocaleString()}</span></p>
                          </div>
                          <div className='modal__answer'>
                              <ReactQuill value={answer} onChange={handleQuill} placeholder='Enter your answer' />
                          </div>
                          <div className='modal__buttons'>
                              <button className='cancel' onClick={() => setIsModalOpen(false)}>Cancel</button>
                              <button onClick={handleSubmit} className='add' type='submit'>Add Answer</button>
                          </div>
                      </Modal>
              </div>
          </div>
          {
           post.questionUrl !== "" && <img src={post.questionUrl} alt='Question image'/>
          }
          <div className='post__footer'>
              <div className='post__footerAction'>
                  <ArrowUpwardOutlined />
                  <ArrowDownwardOutlined />
              </div>
              <RepeatOneOutlined />
              <ChatBubbleOutlineOutlined />
                <div className='post__footerLeft'>
                    <ShareOutlined/>
                    <MoreHorizOutlined/>
                </div>
          </div>
          
          <p style={{ color: 'rgba(0,0,0,0.5)', fontSize: '12px', fontWeight: 'bold', margin: '10px 0px' }}>{post.allAnswers.length} Answer(s)</p>
          {
              post.allAnswers.map((_a) => (

                  <div style={{
                      margin: '5px 0px 0px 0px', padding: '5px 0px 0px 20px',
                      borderTop: '1px solid lightgray'
                  }} className='post__answer'>
                      <div className='post-answer-container' style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '10px 5px', borderTop: '1px solid lightgray' }}>


                          <div className='post-answered' style={{ display: 'flex', alignItems: 'center', width: '100%', padding: '10px 5px', marginBottom: '10px', fontSize: '12px', fontWeight: 600, color: '#888' }}>
                              <Avatar src={_a.photoURL}/>
                              <div style={{ margin: '0px 10px' }} className='post-info'>
                                  <p>{_a.userName}</p>
                                  <span><LastSeen date={_a.createdAt} /></span>
                              </div>
                          </div>
                          <div className='post-answer'>{ReactHtmlParser(_a.answer)}</div>

                      </div>

                  </div>
              ))}
      </div>
    
  )
}

export default Post
