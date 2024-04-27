import { z, ZodTypeAny } from 'zod';
import { isEmpty, isObject } from 'lodash';
type FormObject = Record<string, ZodTypeAny>;

export const getFilledRequiredField = <T extends FormObject>(schema: z.ZodObject<FormObject>, values: Record<string, any>) => {
  const fields = schema.shape;

  const requiredFields = Object.entries(fields).reduce(
    (newObj: any, [key, schemaDescription]) => {
      if (!newObj) {
        newObj = {};
      }

      if ((fields[key] as any)?._def?.type === 'object' && !(fields[key] as any)?.optional) {
        if (!newObj?.[key]) {
          newObj[key] = {};
        }

        Object.keys((fields[key] as any)?.shape).forEach((subKey) => {
          const currentField = (fields as any)[key][subKey];

          Object.assign((newObj as any)[key], {
            [subKey]: (currentField as any)?._def?.tests.some((item: any) => item.name === 'required'),
          });
        });
      } else {
        newObj[key as keyof T] = !(schemaDescription as any)?.isOptional();
      }
      return newObj;
    },
    {} as Record<keyof T, boolean>,
  );

  const allFilled = Object.keys(requiredFields)
    .filter((item) => {
      if (isObject(requiredFields[item])) {
        return requiredFields[item];
      }

      return requiredFields[item] === true;
    })
    .every((key) => {
      if (isObject(requiredFields[key])) {
        const allDone = Object.keys(requiredFields[key]).every((sub) => !isEmpty(values[key]?.[sub]));

        return allDone;
      }

      return !isEmpty(values[key]);
    });

  return allFilled;
};
