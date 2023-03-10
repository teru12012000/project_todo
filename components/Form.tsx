import { Button, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import Switch from "@mui/material/Switch";
import { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { changeRadio, deleteitem, handlechangetext, todos } from "../data/funtion";
import parsonal from "../styles/parsonal.css";
import Back from "./Back";
import { motion, MotionValue, Reorder, useMotionValue } from "framer-motion";
import { getDocs } from "firebase/firestore";
type Props={
  mytodo:todos[];
  back:string[];
  font:string[];
  inputtext:string;
  disabled:boolean;
  setTodo:Dispatch<SetStateAction<todos[]>>;
  setText:Dispatch<SetStateAction<string>>;
  setBack:Dispatch<SetStateAction<string[]>>;
  setFont:Dispatch<SetStateAction<string[]>>;
  setDisabled:Dispatch<SetStateAction<boolean>>;
  handleClick:()=>void;
}
const label = { inputProps: { 'aria-label': 'Switch demo' } };
const Form:FC<Props> = ({
  mytodo,
  back,
  font,
  inputtext,
  disabled,
  handleClick,
  setTodo,
  setText,
  setBack,
  setFont,
  setDisabled
}) => {
  const [still,setStill]=useState<todos[]>([]);
  const [comp,setComp]=useState<todos[]>([]);
  const [del,setDel]=useState<boolean>(false);
  //mytodoリストが更新されたときに色の設定
  useEffect(()=>{
    setBack(mytodo.map((item:todos)=>(item.checked?"gray":"#FFCC99")));
    setFont(mytodo.map((item:todos)=>(item.checked?"Black":"blue")));
  },[mytodo])
  return (
    <div>
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
              onChange={(e:ChangeEvent<HTMLInputElement>)=>handlechangetext(e,setText,setDisabled,mytodo,setDel)}
            />
            <Button 
              variant="contained"
              size="large"
              disabled={disabled}
              onClick={handleClick}
            >登録</Button>
          </div>
          <h2 className="mt-5">タスク</h2>
          <p>灰色が完了済み</p>
          <div className="container mt-5 border border-dark w-80 p-4 rounded">
            <Reorder.Group as="ol" axis="y" onReorder={setTodo} className={parsonal.ul} values={mytodo}>
              {mytodo.map((item:todos,index:number)=>(
                  <Reorder.Item 
                    key={item.name} 
                    value={item}
                    style={{
                      backgroundColor:back[index],
                      color:font[index],
                      marginTop:"10px"
                      //boxShadow,y,
                    }}
                  >
                    <Switch 
                      {...label}
                      checked={item.checked}
                      className="text-start"
                      onChange={()=>changeRadio(index,item.id,item.checked,mytodo,setStill,setComp,setTodo)}
                    />
                    <p>{item.name}</p>
                    <IconButton 
                      aria-label="delete" 
                      color="primary"
                      style={{cursor:"pointer"}}
                      sx={{fontSize:30}}
                      disabled={del}
                      onClick={()=>deleteitem(index,item.id,mytodo,setTodo)}
                    >
                      <DeleteIcon className="text-end"/>
                    </IconButton>
                  </Reorder.Item>
              ))}
            </Reorder.Group>
          </div>
        </div>
      </div>
  );
}

export default Form;