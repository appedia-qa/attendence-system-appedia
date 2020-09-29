const accentList = {
  'Espanola': 'Española',
  'Pinzon': 'Pinzón',
  'Rabida': 'Rábida',
  'San Cristobal': 'San Cristóbal',
  'Santa Fe': 'Santa Fé',
  'Bahia Elizabeth': 'Bahía Elizabeth'
};

const accents = (name, add) => {
  if (add) {
    if (accentList.hasOwnProperty(name) ) {
      return accentList[name]
    } else return name;
  }
  if (!add) {
    if (Object.values(accentList).indexOf(name) >= 0) {
      return Object.keys(accentList).find(key => accentList[key] === name)
    } else  return name;
  }
};

export default accents;
