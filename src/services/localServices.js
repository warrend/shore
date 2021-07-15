export default {
  getData: (item) => {
    const res = localStorage.getItem(item);
    return JSON.parse(res);
  },
  setData: (name, data) => {
    const dataString = JSON.stringify(data);
    return localStorage.setItem(name, dataString);
  },
};
