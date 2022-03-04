const validateArray = (data) => {
  return Array.isArray(data) && data.length > 0 && data !== undefined;
};

const validation = {
  validateArray: validateArray,
};

export { validation };
