import { services } from '@/constants';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  ListItemText,
  OutlinedInput,
  TextField,
} from '@mui/material';
import { useField } from 'formik';

interface FormikMultiSelectProps {
  name: string;
  label: string;
}

export const FormikMultiSelect = ({ name, label }: FormikMultiSelectProps) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }> | import('@mui/material').SelectChangeEvent) => {
    const {
      target: { value },
    } = event as import('@mui/material').SelectChangeEvent;

    helpers.setValue(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <FormControl fullWidth size='small'>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        value={field.value || []}
        onChange={handleChange}
        input={
          <OutlinedInput
            label={label}
            sx={{
              //borderRadius: '100px',
              bgcolor: '#fff',
              // height: '50px',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#e5e7eb',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#FF4D00',
                borderWidth: 1,
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#e5e7eb',
              },
            }}
          />
        }
        renderValue={(selected) => selected.join(', ')}
      >
        {services.map((service) => (
          <MenuItem key={service} value={service}>
            {/* <Checkbox checked={field.value?.includes(name)} /> */}
            <ListItemText primary={service} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
