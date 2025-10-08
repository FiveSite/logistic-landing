import React from 'react';
import { Autocomplete, TextField, Box } from '@mui/material';

export const SelectComponent = ({
  options,
  label,
  onChange,
  value,
}: {
  options: {
    value: string;
    label: string;
  }[];
  label: string;
  onChange: (
    event: React.SyntheticEvent,
    value: { value: string; label: string } | null,
    reason: string
    //details?: any
  ) => void;
  value: {
    value: string;
    label: string;
  };
}) => {
  return (
    <Autocomplete
      id='country-select-demo'
      sx={{ width: 200, height: '50px' }}
      options={options}
      autoHighlight
      value={value}
      onChange={onChange}
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <Box key={key} component='li' sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...optionProps}>
            <img
              loading='lazy'
              width='20'
              srcSet={`https://flagcdn.com/w40/${option.value.toLowerCase()}.png 2x`}
              src={`https://flagcdn.com/w20/${option.value.toLowerCase()}.png`}
              alt=''
            />
            {option.label}
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          slotProps={{
            htmlInput: {
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            },
          }}
          InputLabelProps={{
            sx: {
              marginBottom: '4px',
              color: '#6B7280', // 🟡 звичайний колір label (до фокусу)
              '&.Mui-focused': {
                color: '#FF4D00', // ✅ колір label у фокусі
              },
              '&.MuiFormLabel-filled': {
                color: '#FF4D00', // ✅ колір label, коли поле вже заповнене
              },
            },
          }}
          InputProps={{
            ...params.InputProps,
            sx: {
              borderRadius: '100px',
              bgcolor: '#fff',
              height: '50px',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#F1F3F7',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#FF4D00',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#FF4D00',
              },
            },
          }}
        />
      )}
    />
  );
};
