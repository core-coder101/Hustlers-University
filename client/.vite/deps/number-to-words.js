import {
  __commonJS
} from "./chunk-LK32TJAX.js";

// node_modules/number-to-words/numberToWords.min.js
var require_numberToWords_min = __commonJS({
  "node_modules/number-to-words/numberToWords.min.js"(exports, module) {
    !function() {
      "use strict";
      var e = "object" == typeof self && self.self === self && self || "object" == typeof global && global.global === global && global || this, t = 9007199254740991;
      function f(e2) {
        return !("number" != typeof e2 || e2 != e2 || e2 === 1 / 0 || e2 === -1 / 0);
      }
      function l(e2) {
        return "number" == typeof e2 && Math.abs(e2) <= t;
      }
      var n = /(hundred|thousand|(m|b|tr|quadr)illion)$/, r = /teen$/, o = /y$/, i = /(zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)$/, s = { zero: "zeroth", one: "first", two: "second", three: "third", four: "fourth", five: "fifth", six: "sixth", seven: "seventh", eight: "eighth", nine: "ninth", ten: "tenth", eleven: "eleventh", twelve: "twelfth" };
      function h(e2) {
        return n.test(e2) || r.test(e2) ? e2 + "th" : o.test(e2) ? e2.replace(o, "ieth") : i.test(e2) ? e2.replace(i, a) : e2;
      }
      function a(e2, t2) {
        return s[t2];
      }
      var u = 10, d = 100, p = 1e3, v = 1e6, b = 1e9, y = 1e12, c = 1e15, g = 9007199254740992, m = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"], w = ["zero", "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
      function x(e2, t2) {
        var n2, r2 = parseInt(e2, 10);
        if (!f(r2)) throw new TypeError("Not a finite number: " + e2 + " (" + typeof e2 + ")");
        if (!l(r2)) throw new RangeError("Input is not a safe number, it’s either too large or too small.");
        return n2 = function e3(t3) {
          var n3, r3, o2 = arguments[1];
          if (0 === t3) return o2 ? o2.join(" ").replace(/,$/, "") : "zero";
          o2 || (o2 = []);
          t3 < 0 && (o2.push("minus"), t3 = Math.abs(t3));
          t3 < 20 ? (n3 = 0, r3 = m[t3]) : t3 < d ? (n3 = t3 % u, r3 = w[Math.floor(t3 / u)], n3 && (r3 += "-" + m[n3], n3 = 0)) : t3 < p ? (n3 = t3 % d, r3 = e3(Math.floor(t3 / d)) + " hundred") : t3 < v ? (n3 = t3 % p, r3 = e3(Math.floor(t3 / p)) + " thousand,") : t3 < b ? (n3 = t3 % v, r3 = e3(Math.floor(t3 / v)) + " million,") : t3 < y ? (n3 = t3 % b, r3 = e3(Math.floor(t3 / b)) + " billion,") : t3 < c ? (n3 = t3 % y, r3 = e3(Math.floor(t3 / y)) + " trillion,") : t3 <= g && (n3 = t3 % c, r3 = e3(Math.floor(t3 / c)) + " quadrillion,");
          o2.push(r3);
          return e3(n3, o2);
        }(r2), t2 ? h(n2) : n2;
      }
      var M = { toOrdinal: function(e2) {
        var t2 = parseInt(e2, 10);
        if (!f(t2)) throw new TypeError("Not a finite number: " + e2 + " (" + typeof e2 + ")");
        if (!l(t2)) throw new RangeError("Input is not a safe number, it’s either too large or too small.");
        var n2 = String(t2), r2 = Math.abs(t2 % 100), o2 = 11 <= r2 && r2 <= 13, i2 = n2.charAt(n2.length - 1);
        return n2 + (o2 ? "th" : "1" === i2 ? "st" : "2" === i2 ? "nd" : "3" === i2 ? "rd" : "th");
      }, toWords: x, toWordsOrdinal: function(e2) {
        return h(x(e2));
      } };
      "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = M), exports.numberToWords = M) : e.numberToWords = M;
    }();
  }
});
export default require_numberToWords_min();
/*! Bundled license information:

number-to-words/numberToWords.min.js:
  (*!
   * Number-To-Words util
   * @version v1.2.4
   * @link https://github.com/marlun78/number-to-words
   * @author Martin Eneqvist (https://github.com/marlun78)
   * @contributors Aleksey Pilyugin (https://github.com/pilyugin),Jeremiah Hall (https://github.com/jeremiahrhall),Adriano Melo (https://github.com/adrianomelo),dmrzn (https://github.com/dmrzn)
   * @license MIT
   *)
*/
//# sourceMappingURL=number-to-words.js.map
