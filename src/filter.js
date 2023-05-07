import Vue from "vue";
import format from "date-fns/format";
import idLocale from "date-fns/locale/id";

Vue.filter("toTitleCase", function(value) {
  var splitStr = value.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(" ");
});

Vue.filter("toUppercase", function(value) {
  var uppercaseValue = value.toUpperCase();
  return uppercaseValue;
});

Vue.filter("formatTime", function(value) {
  if (value) {
    const parts = value.split(":");
    return +parts[0] + ":" + parts[1] + "";
  } else {
    return "00:00";
  }
});

Vue.filter("toTime", function(value) {
  if (value) {
    const parts = value.split(/[ :]/);
    return +parts[1] + ":" + parts[2] + "";
  } else {
    return "00:00";
  }
});

Vue.filter("truncate", function(value, limit) {
  if (value.length > limit) {
    value = value.substring(0, limit - 3) + "...";
  }

  return value;
});

Vue.filter("toDT", value => {
  if (!value) return "";
  if (value == "-") return value;
  return format(value, "dddd, DD-MM-YYYY HH:mm", {
    locale: idLocale
  });
});
Vue.filter("toD", value => {
  if (!value) return "";
  if (value == "-") return value;
  return format(value, "dddd, DD-MM-YYYY", {
    locale: idLocale
  });
});
Vue.filter("toSD", value => {
  if (!value) return "";
  if (value == "-") return value;
  return format(value, "DD-MM-YYYY", {
    locale: idLocale
  });
});
Vue.filter("toSDN", value => {
  if (!value) return "";
  if (value == "-") return value;
  return format(value, "DD MMM YYYY", {
    locale: idLocale
  });
});

Vue.filter("toDN", value => {
  if (!value) return "";
  if (value == "-") return value;
  return format(value, "DD MMMM YYYY", {
    locale: idLocale
  });
});

Vue.filter("toC", function(value) {
  if (typeof value !== "number") {
    return value;
  }
  var formatter = new Intl.NumberFormat("in-ID", {
    // style: 'currency',
    // currency: 'IDR',
    minimumFractionDigits: 0
  });
  return formatter.format(value);
});

Vue.filter("toF2", function(value) {
  if (typeof value !== "number") {
    return value;
  }
  return +value.toFixed(2);
});

Vue.filter("toSubstr", function(value) {
  if (!value) return "-";
  return value.toString().substring(0, 30);
});

Vue.filter("toSubstrLong", function(value) {
  if (!value) return "-";
  return value.toString().substring(0, 50);
});

Vue.filter("toStringC", function(value) {
  if (!value) return "-";
  let stringOr = value.replace(/or/gi, " atau ");
  let stringAnd = stringOr.replace(/and/gi, " dan ");
  return stringAnd;
});

Vue.filter("toStr", function(value) {
  if (Array.isArray(value)) {
    return value.toString();
  } else {
    return value;
  }
});

Vue.filter("kelaminStr", value => {
  switch (value) {
    case "L":
      return "Laki-laki";
    case "P":
      return "Perempuan";
    default:
      return "";
  }
});

Vue.filter("statusStr", value => {
  switch (+value) {
    case 0:
      return "Belum aktivasi";
    case 1:
      return "aktif";
    case 2:
      return "non-aktif";
    default:
      return "";
  }
});
