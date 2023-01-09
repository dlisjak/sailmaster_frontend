export default function formatMoney(n, c, d, t) {
  if (typeof n === "string") {
    n = parseFloat(n);
  }

  c = isNaN((c = Math.abs(c))) ? 2 : c;
  d = d === undefined ? "," : d;
  t = t === undefined ? "." : t;
  let s = n < 0 ? "-" : "";
  let i = String(parseInt((n = Math.abs(Number(n) || 0).toFixed(c))));
  let j = i.length > 3 ? i.length % 3 : 0;

  return (
    s +
    (j ? i.substr(0, j) + t : "") +
    i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) +
    (c
      ? d +
        Math.abs(n - i)
          .toFixed(c)
          .slice(2)
      : "")
  );
}
