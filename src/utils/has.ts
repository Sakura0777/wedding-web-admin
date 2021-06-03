export const hasDo = (
  object: any,
  key: string,
  callback: (obj: any) => any
) => {
  if (object.hasOwnProperty(key)) {
    callback(object[key]);
  }
};

export const hasVal = (object: any, key: string, defaultVal?: any) => {
  if (object && object.hasOwnProperty(key)) {
    return object[key];
  } else if (typeof defaultVal === "number") {
    return defaultVal;
  } else {
    return defaultVal || "";
  }
};

export const hasAssignment = (targetObject: any, assignmentObject: any) => {
  Object.keys(targetObject).forEach((key) => {
    if (assignmentObject.hasOwnProperty(key)) {
      targetObject[key] = assignmentObject[key];
    }
  });
  return targetObject;
};
