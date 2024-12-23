type AnyObject = { [key: string]: any };

interface Config {
  fullObjectReplace?: boolean;
  fullArrayReplace?: boolean;
}

function deepCompareAndRemove(
  obj1: AnyObject,
  obj2: AnyObject,
  config: Config = {}
): AnyObject {
  const { fullObjectReplace = false, fullArrayReplace = false } = config;

  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (fullArrayReplace && obj1.length !== obj2.length) {
      return [...obj2];
    }
    return obj2.filter((item, index) => {
      if (typeof item === "object" && typeof obj1[index] === "object") {
        return (
          Object.keys(deepCompareAndRemove(obj1[index], item, config)).length >
          0
        );
      }
      return item !== obj1[index];
    });
  } else if (
    typeof obj1 === "object" &&
    typeof obj2 === "object" &&
    obj1 !== null &&
    obj2 !== null
  ) {
    const result: AnyObject = {};

    for (const key in obj2) {
      if (key in obj1) {
        if (typeof obj1[key] === "object" && typeof obj2[key] === "object") {
          const modified = deepCompareAndRemove(obj1[key], obj2[key], config);
          if (Object.keys(modified).length > 0) {
            result[key] = fullObjectReplace ? { ...obj2[key] } : modified;
          }
        } else if (obj1[key] !== obj2[key]) {
          result[key] = obj2[key];
        }
      } else {
        result[key] = obj2[key];
      }
    }

    return result;
  }
  return obj2;
}

export { deepCompareAndRemove, AnyObject, Config };
