type Rules = {
  required?: boolean,
  regexp?: RegExp,
  castTo?: 'number' | 'string',
  json?: boolean,
};

export const validate = (props: any, propName: string, rules: Rules) => {
  const prop = props[propName];

  if (rules.required && prop === undefined) {
    throw new Error(propName + ' is required');
  }
  if (rules.regexp && !rules.regexp.test(prop)) {
    throw new Error(propName + ' is incorrect: ' + rules.regexp);
  }

  if (rules.castTo) {
    if (rules.castTo === 'number') {
      return parseInt(prop);
    }

    if (rules.castTo === 'string') {
      return prop.toString();
    }
  }

  if (rules.json) {
    return JSON.parse(prop);
  }

  return prop;
};

export const getParams = (params: { [key: string]: any }, schema: { [key: string]: Rules }): { [key: string]: any } => {
  const result: { [key: string]: any } = {};
  Object.keys(schema).map((paramName) => {
    result[paramName] = validate(params, paramName, schema[paramName]);
  });
  return result;
};
