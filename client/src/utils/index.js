// callbakc parameter == (item, key)
export const mapObject = (obj, callback) => {
  return Object.keys(obj).map((key) => callback(obj[key], key));
};
