import { ChangeEvent, useEffect, useState } from "react";
import parsonal from "../../styles/parsonal.css";
import RestoreFromTrashRoundedIcon from '@mui/icons-material/RestoreFromTrashRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import { Form } from "react-bootstrap";
import { Button, colors, IconButton, Input, Switch, TextField } from "@mui/material";
type todos={
  name:string;
  checked:boolean;
}
const label = { inputProps: { 'aria-label': 'Switch demo' } };
const Parsonal = () => {

  const [inputtext,setText]=useState<string>("");
  const [mytodo,setTodo]=useState<todos[]>([]);
  const [back,setBack]=useState<string[]>([]);
  const [font,setFont]=useState<string[]>([]);
  useEffect(()=>{
    const json:string|null=localStorage.getItem("key")
    if(json){
      setTodo(JSON.parse(json));
    }
    
  },[])
  useEffect(()=>{
    setBack(mytodo.map((item:todos)=>(item.checked?"gray":"#FFCC99")));
    setFont(mytodo.map((item:todos)=>(item.checked?"Black":"blue")))
  },[mytodo])
  const deleteitem=(ind:number)=>{
    //index===ind以外のものを残す
    const todo:todos[]=mytodo.filter((item:todos,index:number)=>(ind!==index));
    setTodo(todo);
  }
  const handleSave=()=>{
    const json:string=JSON.stringify(mytodo,undefined,1);
    localStorage.setItem("key",json);
    window.alert("保存しました");
  }
  //登録ボタンクリックするとき
  const handleClick=()=>{
    const data:todos={
      name:inputtext,
      checked:false,
    }
    setTodo([data,...mytodo]);
    setText("");
    setBack(["#FFCC99",...back]);
    setFont(["blue",...font])
  }
  //テキストが入力された際の処理
  const handlechangetext=(e: ChangeEvent<HTMLInputElement>)=>{
    setText(e.currentTarget.value);
  }
  //チェックボックスがクリックされたとき
  const changeRadio=(ind:number)=>{
    const todo:todos[]=mytodo.map((item:todos,index:number)=>(
      index===ind?{
        name:item.name,
        checked:!item.checked
      }:item
      ));
      setTodo(todo);
      setBack(mytodo.map((item:todos,index:number)=>((ind===index&&item.checked)?"#FFCC99":"gray")));
      setFont(mytodo.map((item:todos,index:number)=>((ind===index&&item.checked)?"#0000CC":"black")));
  }
  return (
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
                  onChange={()=>changeRadio(index)}
                />
                  
                  {item.name}
                </div>
                <div
                  onClick={()=>deleteitem(index)}
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
        <Button 
            variant="contained"
            size="large"
            onClick={()=>handleSave()}
        >保存</Button>
    </div>
  );
}

export default Parsonal;