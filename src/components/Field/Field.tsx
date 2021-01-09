import React from 'react';
import styled from 'styled-components';
import { Field as Instance, FieldAttributes, FormikErrors, FormikTouched } from 'formik';
import { Box } from 'theme-ui';
import { Select, Alert } from 'antd';
import { isArray } from 'lodash';

const { Option } = Select;

export const FieldWrapper = styled.div`
  padding: 0;
  margin-bottom: 10px;
  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
  }
  select {
    padding: 10px;
    min-width: 100px;
    border: 1px solid #ddd;
  }
`;

export const FormLabel = styled.p`
  padding: 0;
  margin-bottom: 10px;
`;

interface IInput extends FieldAttributes<any> {
  label?: string;
  options?: Array<any>;
  errors: FormikErrors<any>;
  touched: FormikTouched<any>;
}

export const Field = ({ label, errors, touched, options, ...props }: IInput) => {
  return (
    <FieldWrapper>
      {label && <FormLabel>{label}</FormLabel>}
      <Box>
        {options && isArray(options) && props.component === 'select' ? (
          <Instance {...props}>
            {options?.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </Instance>
        ) : (
          <Instance {...props} />
        )}
      </Box>
      {errors[props.name] && touched[props.name] && (
        <Alert message={errors[props.name]} type="error" />
      )}
    </FieldWrapper>
  );
};

interface ISelect extends FieldAttributes<any> {
  label?: string;
  errors: FormikErrors<any>;
  touched: FormikTouched<any>;
}

const SelectInstance = ({ onSearch, options, ...props }) => (
  <Select showSearch onSearch={onSearch} {...props}>
    {options?.map((option) => (
      <Option value={option.value}>{option.label}</Option>
    ))}
  </Select>
);

export const SelectField = ({ label, errors, touched, options, onSearch, ...props }: ISelect) => {
  return (
    <FieldWrapper>
      {label && <FormLabel>{label}</FormLabel>}
      <Box>
        <Instance
          name={props.name}
          placeholder="Please select"
          render={() => <SelectInstance options={options} onSearch={onSearch} {...props} />}
        />
      </Box>
      {errors[props.name] && touched[props.name] && (
        <Alert message={errors[props.name]} type="error" />
      )}
    </FieldWrapper>
  );
};
