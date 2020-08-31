import React from 'react';
import {
  TextField,
  InputAdornment
} from '@material-ui/core';
import {
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';

import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    hide: {
      display: 'none'
    },
    closeBtn: {
      cursor: 'pointer'
    }
  }),
);

interface IFilterInput {
  type: string
  columnId: string
  placeholder: string
  filterTypes: string[]
  deleteFilter: (value: string, param: string) => void;
  setFilter: (param: string, value: string) => void
}

export default function FilterInput(props: IFilterInput) {
  const { columnId, type, placeholder, filterTypes, deleteFilter, setFilter } = props
  const classes = useStyles();

  let visible = filterTypes.some((filterType: string) => filterType == placeholder)

  return (
    <form className={visible ? classes.root : classes.hide} noValidate autoComplete="off" onSubmit={e => { e.preventDefault(); }}>
      <TextField
        id="outlined-basic"
        variant="outlined"
        label={`Search ${placeholder}`}
        placeholder={placeholder}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(event) => setFilter(columnId, event.target.value)}
        InputProps={{
          endAdornment: <InputAdornment position="end" className={classes.closeBtn} onClick={() => (deleteFilter(placeholder, columnId))}><CloseIcon /></InputAdornment>
        }}
      />
    </form>
  )
}
