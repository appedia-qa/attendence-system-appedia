/* eslint-disable */ const arabicString = {
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
    "Quantity": "كمية",
    "Select All": "اختر الكل",
    "Product ID": "معرف المنتج",
    "Product Name": "اسم المنتج",
    "Product URL": "عنوان URL للمنتج",
    "Add Item":"اضافة عنصر",
    "Delete Item":"حذف العنصر",
    "Home":"الصفحة الرئيسية",
    "Log out":"تسجيل خروج",
    "Edit":"تعديل",
    "Print":"طباعة",
    "Product Name":"اسم المنتج",
    "Product Description":"وصف المنتج",
    "Product Code":"كود المنتج",
    "Product Url":"عنوان URL للمنتج",
    "Copy Url":"إنسخ الرابط",
    "Print Code":"كود الطباعة",
    "Save":"حفظ",
    "Cancel":"إلغاء",
    "Upload Photo":"حمل الصورة",
    "User Name":"اسم المستخدم",
    "password":"كلمه السر",
    "Login":"تسجيل الدخول",
    "Enter Search Text": "أدخل نص البحث",
    "{0}": function (a) {
      return [a("0")];
    },
    "{zoneValue}": function (a) {
      return [a("zoneValue")];
    },
  },
};

export default arabicString;
