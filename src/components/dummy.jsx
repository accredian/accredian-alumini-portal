import React, { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';

const AddableSelect = () => {
  const [value, setValue] = useState('');
  const [options, setOptions] = useState(['Option 1', 'Option 2', 'Option 3']);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
    <h1>hey</h1>
     <Autocomplete
      value={value}
      onChange={handleChange}
      options={options}
      freeSolo
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Select or add option"
        />
      )}
    />
    </>
   
  );
};

export default AddableSelect;
