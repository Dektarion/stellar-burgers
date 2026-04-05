import { SetStateAction, useState } from 'react';

export function useForm<T>(inputValues: T) {
  const [values, setValues] = useState<T>(inputValues);

  const setField = (field: keyof T) => (value: SetStateAction<string>) =>
    setValues((prev) => ({
      ...prev,
      [field]: value
    }));

  return { values, setValues, setField };
}
