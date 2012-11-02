/**
 * Zjištění počtu slok
 *
 * @return int Počet slok
 */
function countSloka()
{
  var content = document.getElementById("content");
  if (content == undefined)
    return 0;
  var s = document.getElementsByClassName("sloka");
  return s.length;
}

/**
 * Zobrazení požadované sloky
 *
 * Sloky mají id ve tvaru "sloka_číslo"
 *
 * @param int s Požadovaná sloka
 */
function showSloka(s)
{
  s = s || 1;
  if (s < 1)
    s = 1;
  if (s > pisen.pocet)
    s = 1;
  s = "sloka_"+s;
  var lst = document.getElementsByClassName("sloka"), el, i;
  for(i = 0; i < lst.length; i++)
  {
    el = lst[i];
    showElement(el, el.id && el.id == s);
  }
  // Doplnění textu refrénu
  var el_refren = document.getElementById("refren");
  if (el_refren != undefined)
  {
    lst = document.getElementsByClassName("refren");
    for (i = 0; i < lst.length; i++)
    {
      el = lst[i];
      el.innerHTML = el_refren.innerHTML;
    }
  }
}

/**
 * Načtení stránky
 *
 * @param page Název stránky
 * @param func Funkce zavolaná po načtení
 */
function loadPage(page, func)
{
  var baseURL = window.location.href, p;
  p = baseURL.lastIndexOf("/");
  if (p >= 0)
    baseURL = baseURL.substr(0, p+1);
  var a = new ajax();
  a._page = page;
  a.onCompletion = function()
  {
    var el = document.getElementById("content");
    if (el == undefined)
      return;
    el.innerHTML = "<div id=\"cislo\"></div>" + this.responseText;
    // Doplnění čísla
    if (a._page != "top")
    {
      el = document.getElementById("cislo");
      if (el != undefined)
        el.innerHTML = a._page;
      showElement("cislo");
    }
    else
    {
      showElement("cislo", false);
    }
    func(this);
  };
  a.onError = function()
  {
    var el = document.getElementById("content");
    if (el == undefined)
      return;
    el.innerHTML = "<p class=\"error\">Stránka nebyla nalezena.</p>";
    showElement("nav_top", true);
  }
  a.run(baseURL+"data/"+page+".html");
}

/**
 * Načtení úvodní stránky
 */
function loadPageTop()
{
  loadPage("top", function(self)
  {
    showElement("nav_top", false);
    if (pisen.cislo > 0)
    {
      var el = document.getElementById("pisen");
      if (el != undefined)
        el.value = int2str(pisen.cislo);
    }
  });
}

/**
 * Načtení stránky s písní
 *
 * @param n Číslo písně
 * @param s Číslo sloky (výchozí = 1)
 */
function loadPagePisen(n, s)
{
  if (n == undefined)
    n = "101";
  s = s || 1;
  loadPage(n, function(self)
  {
    showElement("nav_top", true);
    pisen.cislo = n;
    pisen.sloka = s;
    pisen.pocet = countSloka();
    if (pisen.sloka > pisen.pocet)
      pisen.sloka = 1;
    showSloka(pisen.sloka);
  });
}

var pisen = { "cislo" : 0, "sloka" : 1, "pocet" : 0 }

