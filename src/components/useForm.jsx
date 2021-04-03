import { useState } from 'react';

const useForm = (initialState, validate, callback) => {
  const [data, setData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validate) setErrors(validate(data));
    if (Object.keys(errors).length === 0) callback();
  };

  return {
    handleChange,
    handleSubmit,
    data,
    setData,
    errors,
  };
};

export default useForm;
