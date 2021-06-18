export const localServices = {
  getData: (item) => {
    try {
      const res = localStorage.getItem(item);
      return JSON.parse(res);
    } catch (error) {
      console.error(error);
    }
  },
  setData: (name, data) => {
    const dataString = JSON.stringify(data);
    try {
      return localStorage.setItem(name, dataString);
    } catch (error) {
      console.error(error);
    }
  },
};

export default localServices;
