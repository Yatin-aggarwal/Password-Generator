import { useState,useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setlength] = useState(8)
  const [number , numberallowed] = useState(0)
  const [capital_characters, charallowed] = useState(0)
  const [special_chars , special_chars_allowd] = useState(0)
  const [password,setPassword] = useState("")
  const password_ref = useRef(null)
  const passwordgen = useCallback(()=>{
        let counter = "";
        let pass = "abcdefghijklmnopqrstuvwxyz";
        if(number){
          pass += "0123456789012345678901234567890123456789"
        }
        if(capital_characters){
          pass+=  "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        }
        if(special_chars){
          pass+="!@#$%^&~`"
        }
        console.log(pass)
        for(let i = 0 ; i <= length; i++){
          let ptr = Math.floor(Math.random()*pass.length+1)
          counter+= pass.charAt(ptr)
        }
        setPassword(counter)


  },[length,number,capital_characters,special_chars,password])
  
const copy_password = useCallback(()=>{
  password_ref.current?.select();
  window.navigator.clipboard.writeText(password)
},[password]);

  
  useEffect(()=>{
    passwordgen()
   },[length, number, capital_characters, special_chars]);


  return (
    <>
     <div className='bg-black h-screen'>
     <div className='text-center'><h1 className='text-gray-50 text-5xl  '> Password Generator</h1></div>
      <div className=' flex justify-center items-center h-5/6 w-full'>
       <div className='flex flex-wrap justify-center items-center bg-slate-700 w-4/5 h-1/3 rounded-xl'>
       <div className='inline-flex h-1/2 pt-5 pb-3.5 w-11/12'>
        <input className='outline-none pl-5 text-xl flex justify-center align-middle  bg-white w-10/12 h-full rounded-l-2xl focus:ring-0 focus:border-none ' ref={password_ref} type='text' value={password}  placeholder='password' readOnly />
        <button className='bg-red-300 w-2/12 h-full rounded-r-xl hover:bg-red-500 shadow-lg' onClick={copy_password}> copy </button>
        </div>
        
        <div className='flex flex-row w-full justify-center mb-10 gap-7'>
          <span><input type="range" min={6} max={128} value={length} onChange={(e)=>{ setlength(e.target.value)}} className="cursor-pointer overscroll-x-auto"   />
          <br />
          <label >Length: {length}</label>
          </span>
          <span > <input type="checkbox" defaultChecked={number} onChange={(e)=>{numberallowed((prev)=>!prev)}}/>
          <br />
          <label >Number</label>
          </span>
          <span > <input type="checkbox" defaultChecked={capital_characters} onChange={(e)=>{charallowed((prev)=>!prev)}}/>
          <br />
          <label >Captal <br /> Characters</label>
          </span>
          <span > <input type="checkbox" defaultChecked={special_chars} onChange={(e)=>{special_chars_allowd((prev)=>!prev)}}/>
          <br />
          <label >Special <br /> Characters</label>
          </span>
          </div>
        </div>
       </div>
      </div>
    </>
  )
}

export default App
