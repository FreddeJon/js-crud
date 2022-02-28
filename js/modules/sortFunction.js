const sortData = (data) => {
  console.log("runs");
  console.log(Array.isArray(data));
  const sorted = data.sort((a, b) => {
    var nameA = a.namn.toUpperCase(); // ignore upper and lowercase
    var nameB = b.namn.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  console.log("first");
  console.log(sorted);
  return sorted;
};

export { sortData };
