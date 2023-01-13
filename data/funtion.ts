import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, updateDoc } from "firebase/firestore";
import { ChangeEvent,Dispatch, SetStateAction } from "react";
import db from "../src/firebase";

export type todos={
  id:string|undefined;
  name:string;
  checked:boolean;
}

export const handlechangetext=(
  e: ChangeEvent<HTMLInputElement>,
  setText:Dispatch<SetStateAction<string>>,
  )=>{
  setText(e.currentTarget.value);
}
//個人用保存ボタン
export const handlesave=(
  mytodo:todos[]
)=>{
  const json:string=JSON.stringify(mytodo,undefined,1);
  localStorage.setItem("key",json);
  window.alert("保存しました");
}
//登録ボタンを押したとき(個人用)
export const handleClick_personal=(
  inputtext:string,
  mytodo:todos[],
  back:string[],
  font:string[],
  setText:Dispatch<SetStateAction<string>>,
  setTodo:Dispatch<SetStateAction<todos[]>>,
  setBack:Dispatch<SetStateAction<string[]>>,
  setFont:Dispatch<SetStateAction<string[]>>,
)=>{
  const data:todos={
    id:undefined,
    name:inputtext,
    checked:false,
  }
  setTodo([data,...mytodo]);
  setText("");
  setBack(["#FFCC99",...back]);
  setFont(["blue",...font])
}

//登録ボタンを押したとき(共有用)
export const handleClick_entire=(
  inputtext:string,
  setText:Dispatch<SetStateAction<string>>,
  setTodo:Dispatch<SetStateAction<todos[]>>,
)=>{
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

//アイテムを削除
export const deleteitem=async(
  ind:number,
  id:string|undefined,
  mytodo:todos[],
  setTodo:Dispatch<SetStateAction<todos[]>>,
)=>{
  if(id){
    const postData=collection(db,"posts");
    await deleteDoc(doc(db,"posts",id));
    const againpostData=collection(db,"posts");
    onSnapshot(againpostData,(post)=>{
      setTodo(post.docs.map((doc)=>({id:doc.id,...doc.data()} as todos)))
    })
  }else{
    const todo:todos[]=mytodo.filter((item:todos,index:number)=>(ind!==index));
    setTodo(todo);
  }
}

export const changeRadio=async(
  ind:number,
  id:string|undefined,
  check:boolean,
  mytodo:todos[],
  setTodo:Dispatch<SetStateAction<todos[]>>,
)=>{
  if(id){
    const postData=collection(db,"posts");
    await updateDoc(doc(db,"posts",id),{
        checked:!check,
      })
    onSnapshot(postData,(post)=>{
      setTodo(post.docs.map((doc)=>({id:id,...doc.data()} as todos)))
    })
  }else{
    const todo:todos[]=mytodo.map((item:todos,index:number)=>(
      index===ind?{
        id:undefined,
        name:item.name,
        checked:!item.checked
      }:item
      ));
      setTodo(todo);
  }
}