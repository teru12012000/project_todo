import { collection,  getDocs, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "../../src/firebase";
import Head from "next/head";
import { handleClick_entire, todos } from "../../data/funtion";
import Form from "../../components/Form";
const Entire = () => {
  const [inputtext,setText]=useState<string>("");
  const [mytodo,setTodo]=useState<todos[]>([]);
  const [back,setBack]=useState<string[]>([]);
  const [font,setFont]=useState<string[]>([]);
  const submit=():void=>handleClick_entire(
    inputtext,
    setText,
    setTodo
  )
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
  return (
    <div>
      <Head>
        <title>ProjectTodo</title>
        <meta name="description" content="全体共有用のTODOアプリです" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Form
        mytodo={mytodo}
        back={back}
        font={font}
        handleClick={submit}
        setTodo={setTodo}
        inputtext={inputtext}
        setText={setText}
        setBack={setBack}
        setFont={setFont}
      />
    </div>
  );
}

export default Entire;