import React from 'react';

export const staticData = {
  companyName: 'Lorem Ipsum',
  email: {
    link: 'mailto:office@lorem.com',
    text: 'office@lorem.com',
  },
  tel: {
    link: 'tel:Lorem Ipsum',
    text: 'Lorem Ipsum',
  },
  address: ['Lorem Ipsum', 'Lorem Ipsum'],
  // facebookLink: 'https://www.facebook.com/Lorem Ipsum/',
};

export const staticDataContext = React.createContext(staticData);
export const StaticDataProvider = ({ children }) => (
  <staticDataContext.Provider value={staticData}>
    {children}
  </staticDataContext.Provider>
);
