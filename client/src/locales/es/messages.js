/* eslint-disable */ const franchString = {
  languageData: {
    plurals: function (n, ord) {
      var s = String(n).split("."),
        v0 = !s[0],
        t0 = Number(s[0]) == n,
        n10 = t0 && s[0].slice(-1),
        n100 = t0 && s[0].slice(-2);
      if (ord)
        return n10 == 1 && n100 != 11
          ? "one"
          : n10 == 2 && n100 != 12
          ? "two"
          : n10 == 3 && n100 != 13
          ? "few"
          : "other";
      return n == 1 && v0 ? "one" : "other";
    },
  },
  messages: {
    Quantity: "Quantité",
    " Select All ": "Tout sélectionner",
    "Product ID": "ID produit",
    "Product Name": "Nom du produit",
    "Product URL": "URL du produit",
    "Add Item": "Ajouter un item",
    "Delete Item": "Effacer l'article",
    Home: "Accueil",
    "Log out": "Se déconnecter",
    Edit: "Éditer",
    Print: "Impression",
    "Product Name": "Nom du produit",
    "Product Description": "Description du produit",
    "Product Code": "Code produit",
    "Product Url": "URL du produit",
    "Copy Url": "Copier le lien",
    "Product Code": "Code produit",
    "Print Code": "Code d'impression",
    Save: "Enregistrer",
    Cancel: "Annuler",
    "Upload Photo": "Envoyer la Photo",
    "User Name": "Nom d'utilisateur",
    password: "mot de passe",
    Login: "S'identifier",
    "Enter Search Text": "Entrez le texte de recherche",
    "Please add square images for better result":
      "Veuillez ajouter des images carrées pour un meilleur résultat",
    "{0}": function (a) {
      return [a("0")];
    },
    "{zoneValue}": function (a) {
      return [a("zoneValue")];
    },
  },
};

export default franchString;
