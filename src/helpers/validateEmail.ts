export const validateEmail = (value:string) => {
  const valid = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
  return valid.test(value) ? true : false;
};