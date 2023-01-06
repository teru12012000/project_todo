import { async } from "@firebase/util";
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, updateDoc } from "firebase/firestore";
import { ChangeEvent, useEffect, useState } from "react";
import db from "../../src/firebase";
import parsonal from "../../styles/parsonal.css";
import RestoreFromTrashRoundedIcon from '@mui/icons-material/RestoreFromTrashRounded';
type todos={
  id:string;
  checked:boolean;
  name:string;
}

const Entire = () => {
  const [inputtext,setText]=useState<string>("");
  const [mytodo,setTodo]=useState<todos[]>([]);
  const [dec,setDec]=useState<string[]>([]);
  
  const deleteitem=async(id:string)=>{
    const postData=collection(db,"posts");
    //console.log(id)
    await deleteDoc(doc(db,"posts",id));
    getDocs(postData).then((snapShot)=>{
      const data:todos[]=snapShot.docs.map((doc)=>({id:doc.id ,...doc.data()} as todos))
      setTodo(data);
    })
    onSnapshot(postData,(post)=>{
      setTodo(post.docs.map((doc)=>({id:id,...doc.data()} as todos)))
    })
  }
  useEffect(()=>{
    const postData=collection(db,"posts");
    getDocs(postData).then((snapShot)=>{
      const data:todos[]=snapShot.docs.map((doc)=>({id:doc.id ,...doc.data()} as todos))
      setTodo(data);
    })
    onSnapshot(postData,(post)=>{
      setTodo(post.docs.map((doc)=>({id:doc.id ,...doc.data()} as todos)))
    })
  },[])
  //登録ボタンクリックするとき
  const handleClick=()=>{
    const postData=collection(db,"posts");
    const docRef=addDoc(postData,{name:inputtext,checked:false})
    onSnapshot(postData,(post)=>{
      setTodo(post.docs.map((doc)=>({id:doc.id,...doc.data() }as todos)))
    })
    getDocs(postData).then((snapShot)=>{
      const data:todos[]=snapShot.docs.map((doc)=>({id:doc.id ,...doc.data()} as todos))
      setTodo(data);
    })
    onSnapshot(postData,(post)=>{
      setTodo(post.docs.map((doc)=>({id:doc.id ,...doc.data()} as todos)))
    })
    setText("");
    
  }
  //テキストが入力された際の処理
  const handlechangetext=(e: ChangeEvent<HTMLInputElement>)=>{
    setText(e.currentTarget.value);
  }
  //チェックボックスがクリックされたとき
  const changeRadio=async(id:string,check:boolean)=>{
    console.log(id);
    const postData=collection(db,"posts");
    await updateDoc(doc(db,"posts",id),{
        checked:!check,
      })
    onSnapshot(postData,(post)=>{
      setTodo(post.docs.map((doc)=>({id:id,...doc.data()} as todos)))
    })
  }
  
  return (
    <div className={parsonal.content}>
      <h1>TODO</h1>
        <div>
          <input 
            type="text"
            value={inputtext}
            onChange={(e:ChangeEvent<HTMLInputElement>)=>handlechangetext(e)}
          />
          <input
            type="button"
            value="登録"
            onClick={()=>handleClick()}
          />
        </div>
        <div>
          <ul className={parsonal.ul}>
            {mytodo.map((item:todos,index:number)=>(
              <li key={index} className={parsonal.li}>
                <div style={{fontSize:"20px"}}>
                <input 
                  type="checkbox"
                  checked={item.checked}
                  onChange={()=>changeRadio(item.id,item.checked)}
                />
                  {item.name}
                </div>
                <div>
                  <RestoreFromTrashRoundedIcon
                    onClick={()=>deleteitem(item.id)}
                    sx={{fontSize:30}}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
    </div>
  );
}

export default Entire;