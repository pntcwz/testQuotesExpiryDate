export const CUSTOM_DEFINE = {
  SetHeaderAuth: 'SetXAuthToken',
  HeaderAuth: 'XAuthToken',
  KwIdentity: 'Kw_Identity'
};

export const debug = {
  isDebug: true,
  console: {
    log: function (...args) {
      if (debug.isDebug && typeof (console) != 'undefined' && console.log) {
        if (args.length <= 0) return;
        console.log(args);
        // console.trace();
      }
    },
    warn: function (...args) {
      if (debug.isDebug && typeof (console) != 'undefined' && console.warn) {
        if (args.length <= 0) return;
        console.warn(args);
        // console.trace();
      }
    },
    error: function (...args) {
      if (debug.isDebug && typeof (console) != 'undefined' && console.error) {
        if (args.length <= 0) return;
        console.error(args);
        // console.trace();
      }
    }
  },
  attributes: {}
};



//取網址列參數
var getParameterByName = function (name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
};

var IsJsonString = function (str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

declare global {
  interface String {
    padString(length: number, str: string): string;
    insertStr(i, d, s): string;
  }
}
String.prototype.padString = function (this: string, length: number, str: string) {
  var s = this;
  while (s.length < length) {
    s = str + s;
  }
  return s;
};

////////////////////////////////////////
//插入字串: str.insertStr(i, d, s)
////////////////////////////////////////
//@param i: 插入位置，負為倒數，正從0起算，負從-1起算
//@param d: 從插入點往後覆蓋字元數
//@param s: 插入的字串
String.prototype.insertStr = function (i, d, s) {
  return (this.slice(0, i) + s + this.slice(i + Math.abs(d)));
};

// ////////////////////////////////////////
// //alasql用
// ////////////////////////////////////////
// //數字格式整理
// //@param str 字串
// //@param decimalPlace 小數點後面幾位
// alasql.fn.formatNum = function(str, decimalPlace) {
//     decimalPlace = decimalPlace || 0;
//     decimalPlace = numeral(decimalPlace).value();
//     var zerocount = "";
//     for (i = 0; i < decimalPlace; i++) {
//         zerocount = zerocount + "0";
//     }
//     return numeral(str).format('0.' + zerocount);
// };

//JavaScript readAsBinaryString Function on IE11
if (FileReader.prototype.readAsBinaryString === undefined) {
  FileReader.prototype.readAsBinaryString = function (fileData) {
    var binary = "";
    var pt = this;
    var reader = new FileReader();
    reader.onload = function (e) {
      var bytes = new Uint8Array(reader.result);
      var length = bytes.byteLength;
      for (var i = 0; i < length; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      //pt.result  - readonly so assign content to another property
      pt.content = binary;
      pt.onload();
    }

    reader.readAsArrayBuffer(fileData);
  }
}
