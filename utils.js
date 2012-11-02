/*
 * Kancionál - pomocné funkce
 */

/**
 * Zobrazení/skrytí elementu
 *
 * @param name Název elementu nebo element
 * @param fShow Zobrazit? (výchozí = true)
 */
function showElement(name, fShow)
{
  fShow = fShow == undefined ? true : fShow;
  var el = (name instanceof HTMLElement) ? name : document.getElementById(name);
  if (el == undefined)
    return;
  var cls = el.className.replace(/\s*(zobrazit|skryt)/, '');
  el.className = cls + " " + (fShow ? "zobrazit" : "skryt");
}

/**
 * Nastavení příznaku viditelnosti
 *
 * @param name Název elementu
 * @param fVisible Příznak viditelnosti
 */
function setVisibility(name, fVisible)
{
  fVisible = fVisible == undefined ? true : fVisible;
  var el = (name instanceof HTMLElement) ? name : document.getElementById(name);
  if (el == undefined)
    return;
  el.style.visibility = fVisible ? "visible" : "hidden";
}

/**
 * Nastavení rutiny k elementu
 *
 * @param name Název elementu
 * @param func Funkce
 * @param handler Název handleru (výchozí = onClick)
 */
function setHandler(name, func, handler)
{
  handler = handler || "onclick";
  var el = document.getElementById(name);
  if (el == undefined)
    return;
  el[handler] = func;
}

/**
 * Převod čísla na text
 *
 * @param n Číslo (int)
 * @param places Počet míst
 */
function int2str(n, places)
{
  var txt = '';
  for (var i = 0; i < places || n > 0.99; i++)
  {
    txt = (n % 10)+txt;
    n = parseInt(n/10, 10);
  }
  return txt;
}
