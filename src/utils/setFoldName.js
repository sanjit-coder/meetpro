const setFoldName = (value) => {
  if (typeof window !== undefined) {
    window.localStorage.setItem("foldName", value);
  }
};

export default setFoldName;
