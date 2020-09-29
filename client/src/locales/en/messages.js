/* eslint-disable */ module.exports = {
  languageData: {
    plurals: function (n, ord) {
      var s = String(n).split("."),
        v0 = !s[1],
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
    "<0><1>Charles Darwin Foundation\u2019s <2>DataZone:</2> </1><3>https://www.darwinfoundation.org/en/datazone</3><4><5>A rich collection of data including the CDF\u2019s Natural History Collection database, long-term climate data from CDF\u2019s meteorological station (the only such data for Galapagos), and many interactive tools for exploring the human and physical geography of the Islands.</5></4></0>":
      "<0><1>Charles Darwin Foundation\u2019s <2>DataZone:</2> </1><3>https://www.darwinfoundation.org/en/datazone</3><4><5>A rich collection of data including the CDF\u2019s Natural History Collection database, long-term climate data from CDF\u2019s meteorological station (the only such data for Galapagos), and many interactive tools for exploring the human and physical geography of the Islands.</5></4></0>",
    "Indoor Plants": "Indoor Plants",
    "Featured Products": "Featured Products",
    "{0}": function (a) {
      return [a("0")];
    },
    "{zoneValue}": function (a) {
      return [a("zoneValue")]; 
    },
  },
};
