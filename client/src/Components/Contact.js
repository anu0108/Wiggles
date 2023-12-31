import React, {useRef, useState} from 'react'
import Navbar from './Navbar'
import profilephoto from '../images/profilephoto.png'
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// require('dotenv').config()

export default function Contact() {
  const form = useRef();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [button, setButton] = useState("Send Message");

  const showSuccessToast = () => {
    toast.success('Message successfully sent!', {
        data: {
            title: 'Success toast',
        }
    });
};
const showErrorToast = () => {
    toast.error('Message not sent, try again later.', {
        data: {
            title: 'Error toast',
        }
    });
};

  const handleOnChange = (e) => {
    setText(e.target.value);
    const textarea = document.querySelector("textarea");
    textarea.addEventListener("keydown", e => {
      textarea.style.height = "auto";
      var scHeight = e.target.scrollHeight;
      textarea.style.height = `${scHeight}px`;
    });
  }
    
  const handleSubmit=async(e)=>{
    e.preventDefault();
    setButton("Sending");
    emailjs.sendForm(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, form.current, process.env.REACT_APP_PUBLIC_API_KEY)
    .then((result) => {
      console.log(result.text);
      setButton("Send Message");
      setName('');
      setEmail('');
      setText('');
      showSuccessToast();
    }, (error) => {
      showErrorToast();
      setButton("Send Message");
    });
  };

  return (
    <>
    <Navbar/>
    <div className='contact-window'>
      <div className='contact-container'>
        <form ref={form} onSubmit={(e)=>handleSubmit(e)} className="contact-wrapper-right">
          <h1>Contact Us</h1>
          <input
            id='name'
            type='text' 
            name='Name' 
            value={name}
            placeholder='Full Name' 
            onChange = {(e)=>setName(e.target.value)} 
            required/>
          <input 
            id='email' 
            type='email' 
            name='Email' 
            value={email}
            placeholder='Email ID' 
            onChange = {(e)=>setEmail(e.target.value)}
            required></input>
          <textarea 
            id='message' 
            name='Message' 
            value={text} 
            placeholder='Message' 
            rows='2'
            onChange = {handleOnChange} 
            required>{text}</textarea>
          <button id='submitBtn' type="submit">{button}</button>
          <ToastContainer 
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          />
        </form>
        <img src={profilephoto} alt="My Pet" className="contact-wrapper-left" />
      </div>
    </div>
    </>
  )
}
