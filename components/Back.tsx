import IconButton from "@mui/material/IconButton";
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import Link from "next/link";
import { FC } from "react";
type Props={
  link:string;
}
const Back:FC<Props> = ({link}) => {
  return (
    <div>
      <Link href={link}>
        <IconButton color="primary" aria-label="back">
          <KeyboardBackspaceRoundedIcon />
        </IconButton>
      </Link>
    </div>
  );
}

export default Back;