import { Button, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import Switch from "@mui/material/Switch";
import { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { changeRadio, deleteitem, handlechangetext, todos } from "../data/funtion";
import parsonal from "../styles/parsonal.css";
import Back from "./Back";
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
  //mytodoリストが更新されたときに色の設定
  useEffect(()=>{
    setBack(mytodo.map((item:todos)=>(item.checked?"gray":"#FFCC99")));
    setFont(mytodo.map((item:todos)=>(item.checked?"Black":"blue")))
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
              onChange={(e:ChangeEvent<HTMLInputElement>)=>handlechangetext(e,setText,setDisabled)}
            />
            <Button 
              variant="contained"
              size="large"
              disabled={disabled}
              onClick={handleClick}
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
                    onChange={()=>changeRadio(index,item.id,item.checked,mytodo,setTodo)}
                  />

                    {item.name}
                  </div>
                  <div
                    onClick={()=>deleteitem(index,item.id,mytodo,setTodo)}
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

export default Form;