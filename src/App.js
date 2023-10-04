
import { useState } from 'react';
import './App.css';
import loader from "loading-12.gif"
function App() {

  const [name,setName]=useState()
  const [email,setEmail]=useState()
  const [subject,setSubkect]=useState()
  const [phone,setPhone]=useState("+1")
  const [problem,setProblem]=useState()
  const [modal,setModal]=useState(0)
  const [sending,setSending]=useState(false)
 function setPhoneChanged(value){
  if(value.length>12){
    return
  }
  if(value.length<=2){
    setPhone("+1");
    return
  }
      const regExp=/[^0-9]/
      const newValue=value.substring(2).replace(regExp,"")
      
      setPhone("+1"+newValue);
  }

  function sendForm(){
    setModal(1);
    fetch(
      "http://ezride.pro/api/v1/client/complaint",
      {
        method: "post",
        body: JSON.stringify({phone,name,email,subject,problem}),
        headers: {
          'content-type': 'application/json'
      }
      }
    ).then(result=>{
      
      setSending(true)
    }).catch(()=>{
      
    }).finally(
      setModal(0)
    )
  }

  return (
    <div className="app">
      <div className='modal center' style={{opacity:modal,zIndex:modal-1}}>
        <img src={loader} alt={"err"} width={50} height={50}/>
      </div>
      <div className='form'>
        {!sending
        ?(<>
          <div className='center'>
          <div className='support_text'>Support service</div>
          <div className='form_title'>"iZZi Ride" Feedback Form</div>
        </div>
        <div className='body'>
          Phone
          <input value={phone}  onChange={(e)=>setPhoneChanged(e.target.value)} />
          Name
          <input placeholder='For example: Alex' value={name}  onChange={(e)=>setName(e.target.value)} />
          Email
          <input placeholder='For example: email@mail.com' value={email} onChange={(e)=>setEmail(e.target.value)}/>
          Subject
          <input placeholder='For example: the application does not work' value={subject} onChange={(e)=>setSubkect(e.target.value)}/>
          Tell the problem
          <textarea placeholder='For example: the application does not work' value={problem} onChange={(e)=>setProblem(e.target.value)}/>
        </div>
        <div className='button_send center' onClick={sendForm}>Send</div>
        </>)
        :(
          <div >
            <div className='support_text'>Request sent</div>
            <div className='form_title'>Wait for a response by email {email}</div>
          </div>
        )
        }
        
      </div>
    </div>
  );
}

export default App;
