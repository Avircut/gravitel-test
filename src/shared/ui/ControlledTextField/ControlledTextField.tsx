import { TextField, OutlinedTextFieldProps } from '@mui/material';
import { HTMLInputTypeAttribute, memo } from 'react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';

interface ControlledTextFieldProps extends OutlinedTextFieldProps {
  name:string;
  control: Control<any>,
  label: string;
  rules?:RegisterOptions<any>;
  type?: HTMLInputTypeAttribute;
  required?: boolean;
}

export const ControlledTextField = memo((props:ControlledTextFieldProps) => {
  const {
    name, control, label, rules, type = 'text', required, id,
  } = props;
  return (
    <Controller
      name={name}
      defaultValue=""
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
        <TextField
          id={id}
          type={type}
          margin="normal"
          helperText={error ? error.message : null}
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          variant="outlined"
          required={required}
        />
      )}
    />
  );
});
