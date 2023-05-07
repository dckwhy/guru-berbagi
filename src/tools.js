import store from "./store";
import differenceInCalendarMonths from "date-fns/difference_in_calendar_months";
import format from "date-fns/format";
import idLocale from "date-fns/locale/id";
import addMonths from "date-fns/add_months";
import distanceInWords from "date-fns/distance_in_words";

/* eslint-disable */
export const isCan = perm => {
  if (!perm) return true;
  if (perm == "-") return false;
  if (perm === true || perm == false) return true;

  let permission = store.getters["user/permission"];

  const objPerm = permission.find(permission => permission.nama === perm);

  // eslint-disable-next-line
  if (objPerm) {
    return objPerm.value;
  } else {
    return false;
  }

  //eslint-disable-next-line
  let _m = perm.split("|");
  let _r = false;
  _m.forEach(p => {
    _r =
      _r ||
      p == "*" ||
      permission.filter(i => i.permission === p && i.value).length > 0;
    if (_r) return;
  });
  return _r;
};

export const normParam = (param, auto = true) => {
  // eslint-disable-next-line

  let par = param
    ? Object.keys(param)
        .filter(
          key =>
            param[key] !== "" && param[key] !== null && param[key] !== undefined
        )
        .map(key => key + "=" + param[key])
        .join("&")
    : "";
  // par ? `?${par}` : ''
  if (par && auto) par = `?${par}`;
  return par;
};

export const monthBetween = (start, end) => {
  const s = new Date(start);
  const e = new Date(end);
  return differenceInCalendarMonths(e, s) + (e >= s ? 1 : 0);
};

export const toDT = value => {
  if (!value) return "";
  return format(value, "dddd, DD-MM-YYYY HH:mm", {
    locale: idLocale
  });
};

export const toD = value => {
  if (!value) return "";
  return format(value, "dddd, DD-MM-YYYY", {
    locale: idLocale
  });
};

export const toSD = value => {
  if (!value) return "";
  return format(value, "DD-MM-YYYY", {
    locale: idLocale
  });
};

export const toYM = value => {
  if (!value) return "";
  return format(value, "YYYY-MM", {
    locale: idLocale
  });
};

export const toMMY = value => {
  if (!value) return "";
  return format(value, "MMMM YYYY", {
    locale: idLocale
  });
};

export const addM = addMonths;

export const deltaDTW = (a, b) =>
  distanceInWords(a, b, {
    locale: idLocale
  }) + " yang lalu";
export const deltaDTWN = a =>
  distanceInWords(a, new Date(), {
    locale: idLocale
  }) + " yang lalu";

export const groupBy = (array, key) => {
  const result = {};
  array.forEach(item => {
    if (!result[item[key]]) {
      result[item[key]] = [];
    }
    result[item[key]].push(item);
  });
  return result;
};

export const strToArrayObj = (o, prop) => {
  let arr = o[prop] || "";
  if (arr) {
    arr = arr.split(",").map(i => +i);
  } else {
    arr = [];
  }
  o[prop] = arr;
  return o;
};

export const pVal = (obj, a, b = undefined, c = undefined) => {
  let r = "-";
  if (!obj) return r;
  if (!obj[a]) return "-";
  r = obj[a];
  if (typeof b == "undefined") return r;
  if (!r[b]) return "-";
  r = r[b];
  if (typeof c == "undefined") return r;
  if (!r[c]) return "-";
  r = r[c];
  return r;
};

export const wordCount = str => {
  var replaceNewline = str.replace(/<p\s*\/?>/gi, " ");
  var replaceHTML = replaceNewline.replace(/(<([^>]+)>)/gi, "");
  var trimMultiSpace = replaceHTML.replace(/ +(?= )/g, "");
  var c = trimMultiSpace.trim();
  return c == "" ? 0 : c.split(" ").length;
};

export const obj2KeyVal = (obj, key = "name", val = "value") => {
  return Object.keys(obj).map(k => ({
    [key]: k,
    [val]: [obj[k]]
  }));
};
