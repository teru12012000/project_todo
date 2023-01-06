import { style } from "@vanilla-extract/css";

const home={
  content:style({
    position:"absolute",
    top:"50%",
    left:"50%",
    transform:"translate(-50%,-50%)",
    fontSize:"20px",
    textAlign:"center",
  }),
  ul:style({
    padding:"0",
  }),
  li:style({
    listStyle:"none",
    margin:"20px",
    padding:"0",
  }),
  link:style({
    backgroundColor:"yellow",
    color:"blue",
    ':hover':{
      backgroundColor:"aqua",
      color:"white",
      transition:"0.6s",
    }
  })
}

export default home;