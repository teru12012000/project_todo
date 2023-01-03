import { ChangeEvent, useEffect, useState } from "react";
import parsonal from "../../styles/parsonal.css";
import RestoreFromTrashRoundedIcon from '@mui/icons-material/RestoreFromTrashRounded';
type todos={
  name:string;
  checked:boolean;
}
const Parsonal = () => {
  const [inputtext,setText]=useState<string>("");
  const [mytodo,setTodo]=useState<todos[]>([]);
  
  useEffect(()=>{
    const json:string|null=localStorage.getItem("key")
    if(json){
      setTodo(JSON.parse(json));
    }
  },[])
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
  }
  //テキストが入力された際の処理
  const handlechangetext=(e: ChangeEvent<HTMLInputElement>)=>{
    setText(e.currentTarget.value);
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
                <div>
                  {item.name}
                </div>
                <div>
                  <RestoreFromTrashRoundedIcon
                    onClick={()=>deleteitem(index)}
                    sx={{fontSize:30}}
                  />
                    
                  
                </div>
              </li>
            ))}
          </ul>
        </div>
        <input
            type="button"
            value="保存"
            onClick={()=>handleSave()}
          />
    </div>
  );
}

export default Parsonal;