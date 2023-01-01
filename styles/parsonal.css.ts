import { style } from "@vanilla-extract/css";

const parsonal={
  content:style({
    width:"400px",
    height:"80%",
    margin:"auto",
    textAlign:"center",
    '@media':{
      "screen and (max-width)":{
        width:"80%",
      }
    }
  }),
  li:style({
    paddingTop:"25px",
    paddingBottom:"25px",
    listStyle:"none",
    textAlign:"left",
    backgroundColor:"#FFCC99",
    marginBottom:"10px",
    color:"#0000CC",
    display:"flex",
    justifyContent:"space-between",
  }),
  ul:style({
    padding:"0",  
  })
}

export default parsonal;