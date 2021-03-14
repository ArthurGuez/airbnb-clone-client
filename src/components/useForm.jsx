import { useState, useEffect } from 'react';

const useForm = (cb, validate) => {
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
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    });
    setErrors(validate(data));
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && data.isSubmitting) {
      cb();
    } else {
      setData({
        ...data,
        isSubmitting: false,
      });
    }
  }, [errors]);

  return {
    handleChange,
    handleSubmit,
    data,
    errors,
    setData,
  };
};

export default useForm;
