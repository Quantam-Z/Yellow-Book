export const defaultCompany = {
  id: null,
  name: 'Innovate Solutions',
  category: 'Travel',
  industry: 'Travel Tour Operator',
  email: 'contact@innovate.com',
  phone: '+123456789',
  mobile: '+123456789',
  website: 'www.innovatesolution.com',
  assignedDate: '',
  address: ''
};

export const createDefaultCompany = () => ({
  ...defaultCompany
});
