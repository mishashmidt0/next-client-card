function plural(number: number, form1 = "", form2 = "", form3 = "") {
  const n = Math.trunc(Math.abs(number)) % 100;
  const n1 = n % 10;
  let text = form3;

  if (n > 4 && n < 21) {
    text = form3;
  }
  if (n1 === 1) {
    text = form1;
  }
  if (n1 > 1 && n1 < 5) {
    text = form2;
  }

  const isInclude = text.includes("%");

  text = text.replace("%", "");

  return isInclude ? `${number} ${text}` : text;
}

export default plural;
