import { getFilledRequiredField } from "@/utils/getFilledRequiredField";
import { SetIn } from "final-form";
import { useState } from "react";
import { z } from "zod";

const setIn: SetIn = (state, key, value) => {
  const stateTemp: any = { ...state };
  if (key.includes(".")) {
    const splitted = key.split(".");
    stateTemp[splitted[0]] = {
      ...stateTemp[splitted[0]],
      [splitted[1]]: value,
    };
  } else {
    Object.assign(stateTemp, { [key]: value });
  }

  return stateTemp;
};

export const useFormValidation = (schema: z.ZodObject<any, any>) => {
  const [allRequiredFilled, setAllRequiredFilled] = useState(false);
  const validate = (values: Record<string, any>) => {
    setAllRequiredFilled(getFilledRequiredField(schema as any, values));

    try {
      schema.parse(values);
    } catch (error: z.ZodError | any) {
      return error.errors.reduce((errors: any, error: any) => {
        return setIn(errors, error.path.join("."), error.message);
      }, {});
    }
  };

  return {
    validate,
    allRequiredFilled,
  };
};
