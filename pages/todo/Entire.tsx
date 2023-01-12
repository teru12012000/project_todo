import { async } from "@firebase/util";
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, updateDoc } from "firebase/firestore";
import { ChangeEvent, useEffect, useState } from "react";
import db from "../../src/firebase";
import parsonal from "../../styles/parsonal.css";
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreFromTrashRoundedIcon from '@mui/icons-material/RestoreFromTrashRounded';
import { Button, IconButton, Switch, TextField } from "@mui/material";
import Head from "next/head";
import Back from "../../components/Back";
type todos={
  id:string;
  checked:boolean;
  name:string;
}
const label = { inputProps: { 'aria-label': 'Switch demo' } };
const Entire = () => {
  const [inputtext,setText]=useState<string>("");
  const [mytodo,setTodo]=useState<todos[]>([]);
  const [back,setBack]=useState<string[]>([]);
  const [font,setFont]=useState<string[]>([]);
  const deleteitem=async(id:string)=>{
    const postData=collection(db,"posts");
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
  //mytodoが変わった時の色の変更
  useEffect(()=>{
    setBack(mytodo.map((item:todos)=>(item.checked?"gray":"#FFCC99")));
    setFont(mytodo.map((item:todos)=>(item.checked?"Black":"blue")))
  },[mytodo])
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
    const postData=collection(db,"posts");
    await updateDoc(doc(db,"posts",id),{
        checked:!check,
      })
    onSnapshot(postData,(post)=>{
      setTodo(post.docs.map((doc)=>({id:id,...doc.data()} as todos)))
    })
  }
  return (
    <div>
      <Head>
        <title>ProjectTodo</title>
        <meta name="description" content="全体共有用のTODOアプリです" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Back link={"/"}/>
      <div className={parsonal.content}>
        <h1>TODO</h1>
          <div>
            <TextField 
              id="outlined-basic" 
              label="Input TODO!" 
              variant="outlined" 
              value={inputtext}
              size="small"
              onChange={(e:ChangeEvent<HTMLInputElement>)=>handlechangetext(e)}
            />
            <Button 
              variant="contained"
              size="large"
              onClick={()=>handleClick()}
            >登録</Button>
          </div>
          <div>
            <ul className={parsonal.ul}>
              {mytodo.map((item:todos,index:number)=>(
                <li key={index} 
                  className={parsonal.li}
                  style={{
                    backgroundColor:back[index],
                    color:font[index]
                  }}
                >
                  <div>
                  <Switch 
                    {...label}
                    checked={item.checked}
                    onChange={()=>changeRadio(item.id,item.checked)}
                  />
                    
                    {item.name}
                  </div>
                  <div
                    onClick={()=>deleteitem(item.id)}
                  >
                    <IconButton 
                      aria-label="delete" 
                      color="primary"
                      style={{cursor:"pointer"}}
                      sx={{fontSize:30}}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </li>
              ))}
            </ul>
          </div>
      </div>
    </div>
  );
}

export default Entire;