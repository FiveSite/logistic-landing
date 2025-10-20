import React from 'react';
import { Autocomplete, TextField, Box } from '@mui/material';

export const SelectComponent = ({
  options,
  label,
  onChange,
  value,
  isDisabled,
}: {
  options: {
    value: string;
    label: string;
  }[];
  label: string;
  onChange: (event: React.SyntheticEvent, value: { value: string; label: string } | null, reason: string) => void;
  value: {
    value: string;
    label: string;
  };
  isDisabled?: boolean;
}) => {
  return (
    <Autocomplete
      disabled={isDisabled}
      id='country-select-demo'
      sx={{ minWidth: 120, maxWidth: 300, width: 'auto', flex: 1 }}
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
              color: '#6B7280',
              fontSize: {
                xs: '14px',
                sm: '16px',
              },

              // 🟡 ПІДЙОМ лейблу в неактивному стані
              top: '6px',
              transform: 'translate(14px, 6px) scale(1)',

              // ✅ Фокусований
              '&.Mui-focused': {
                color: '#FF4D00',
                top: 0,
                transform: 'translate(14px, -9px) scale(0.75)',
              },

              // ✅ Заповнене поле
              '&.MuiFormLabel-filled': {
                color: '#FF4D00',
                top: 0,
                transform: 'translate(14px, -9px) scale(0.75)',
              },
            },
            // sx: {
            //   color: '#6B7280', // 🟡 звичайний колір label (до фокусу)
            //   fontSize: {
            //     xs: '14px',
            //     sm: '16px',
            //   },

            //   '&.Mui-focused': {
            //     color: '#FF4D00', // ✅ колір label у фокусі
            //   },
            //   '&.MuiFormLabel-filled': {
            //     color: '#FF4D00', // ✅ колір label, коли поле вже заповнене
            //   },
            // },
          }}
          InputProps={{
            ...params.InputProps,
            sx: {
              borderRadius: '100px',
              bgcolor: '#fff',
              height: {
                xs: '40px',
                sm: '50px',
              },
              paddingTop: 0,
              paddingBottom: 0,
              '& input': {
                '& input': {
                  color: '#6B7280',
                  padding: 0, // Важливо: Скидаємо всі відступи на input-елементі
                },
                fontSize: {
                  xs: '14px',
                  sm: '16px',
                },
                '&::placeholder': {
                  fontSize: {
                    xs: '14px',
                    sm: '16px',
                  },
                },
              },

              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'none',
                padding: 0,
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#FF4D00',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: isDisabled ? 'transparent' : '#FF4D00',
              },
            },
          }}
        />
      )}
    />
  );
};
