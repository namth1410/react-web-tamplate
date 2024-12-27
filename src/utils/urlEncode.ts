import queryString from "query-string";

export const urlEncode = (data: Record<string, any>): string => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

const toSnakeCase = (str: string): string => {
  return str.replace(/([A-Z])/g, "_$1").toLowerCase();
};

const convertKeysToSnakeCase = (
  obj: Record<string, any>
): Record<string, any> => {
  const newObj: Record<string, any> = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = toSnakeCase(key);
      newObj[newKey] = obj[key];
    }
  }
  return newObj;
};

export const generateQueryParam = (params: Record<string, any>): string => {
  const snakeCaseParams = convertKeysToSnakeCase(params);
  const searchParams = queryString.stringify(snakeCaseParams);
  const queryStringPart = searchParams ? `?${searchParams}` : "";
  return queryStringPart;
};

export function convertSnakeToCamel(
  obj: Record<string, any>
): Record<string, any> {
  const camelObj: Record<string, any> = {};
  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      const camelKey = key.replace(/_([a-z])/g, (match, group1) =>
        group1.toUpperCase()
      );
      camelObj[camelKey] = obj[key];
    }
  }
  return camelObj;
}
