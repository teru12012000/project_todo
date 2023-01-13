import { useEffect, useState } from "react";
import { Button} from "@mui/material";
import Head from "next/head";
import { handleClick_personal, todos, handlesave} from "../../data/funtion";
import Form from "../../components/Form";
const Parsonal = () => {
  const [inputtext,setText]=useState<string>("");//テキストボックスの値
  const [mytodo,setTodo]=useState<todos[]>([]); //リスト格納(todo)
  const [back,setBack]=useState<string[]>([]);//背景色
  const [font,setFont]=useState<string[]>([]);//文字の色
  //リロード時に保存用のデータを持ってくる
  useEffect(()=>{
    const json:string|null=localStorage.getItem("key")
    if(json){
      setTodo(JSON.parse(json));
    }
  },[])
  const save=():void=>handlesave(mytodo);
  const submit=():void=>handleClick_personal(
    inputtext,
    mytodo,
    back,
    font,
    setText,
    setTodo,
    setBack,
    setFont,
  );
  return (
    <div>
      <Head>
        <title>ProjectTodo</title>
        <meta name="description" content="個人用のTODOアプリです" />
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
      <div
        style={{textAlign:"center"}}
      >
        <Button 
          variant="contained"
          size="large"
          onClick={save}
        >
          保存
        </Button>
      </div>
    </div>
  );
}

export default Parsonal;