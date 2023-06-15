export const formatToDateString = date => {
  const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
  const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
  const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);

  return `${ye}-${mo}-${da}`;
};

export const visitWebsite = () => {
  cy.visit('/');
};

export const getRandomString = length => {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const getRandomNumber = (min = 1, max = 50) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
