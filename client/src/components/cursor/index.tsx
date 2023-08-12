import { useState } from 'react';
import { Box, Fade } from '@mui/material';

const BLOCK_CODE = 9612;
const DURATION_MS = 500;

interface ICursorProps {
  override?: boolean;
}

export const Cursor = ({ override: disable = false }: ICursorProps) => {
  const [show, setShow] = useState<boolean>(false);

  setTimeout(() => setShow(!show), DURATION_MS);

  return (
    <Fade in={disable || show}><Box>{String.fromCharCode(BLOCK_CODE)}</Box></Fade>
  )
}