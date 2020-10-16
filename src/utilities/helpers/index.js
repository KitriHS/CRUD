export function formatRupiah(angka, stringDesimal = '', simbol) {
  var rev = parseInt(angka, 10).toString().split("").reverse().join("");
  var rev2 = "";
  for (var i = 0; i < rev.length; i++) {
    rev2 += rev[i];
    if ((i + 1) % 3 === 0 && i !== (rev.length - 1)) {
      rev2 += ".";
    }
  }
  return "Rp " + `${!simbol ? '' : simbol}` + rev2.split("").reverse().join("") + stringDesimal;
}

export function moneyFormat(x) {
  return "Rp " + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}