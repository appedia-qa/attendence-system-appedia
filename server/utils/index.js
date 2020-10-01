const verifyProductDetails = (details) => {
    if (!details) {
        return false;
    }
    if (!details.ar && !details.fr && !details.eng) {
      return false;
    } 
    if ((details.ar.name == ' ' || details.ar.description === ' ')
       && (details.eng.name === ' ' || details.eng.description === ' ')
       && (details.fr.name === ' '  || details.fr.description === ' ')
    ) {
        return false;
    }
    
    return true;
}

module.exports = verifyProductDetails;