/*
 * Kancionál - obslužné rutiny
 */

/**
 * Po nahrátí stránky
 *
 * Nastavení handlerů
 */
function onLoad()
{
  setHandler("nav_left", function(e) { onLeft(e); });
  setHandler("nav_top", function(e) { onTop(e); });
  setHandler("nav_next", function(e) { onNext(e); });
  setHandler("nav_right", function(e) { onRight(e); });

  loadPageTop();
}

/**
 * Vlevo
 *
 * Zobrazí předchozí sloku
 */
function onLeft(e)
{
  var s = pisen.sloka-1;
  if (s < 0)
    s = 1;
  if (s > pisen.pocet)
    s = pisen.pocet;
  pisen.sloka = s;
  showSloka(s);
}

/**
 * Vpravo
 * 
 * Zobrazí další sloku
 */
function onRight(e)
{
  var s = pisen.sloka + 1;
  if (s < 0)
    s = 1;
  if (s > pisen.pocet)
    s = pisen.pocet;
  pisen.sloka = s;
  showSloka(s);
}

/**
 * Nahoru
 *
 * Zobrazí číselník
 */
function onTop(e)
{
  loadPageTop();
}

/**
 * Dál
 *
 * Zobrazení dalšího textu
 */
function onNext(e)
{
}

/**
 * Posun v čísle písně
 *
 * @param n O kolik
 */
function onPisenChange(n)
{
  var pisen_el = document.getElementById('pisen');
  if (pisen_el == undefined)
    return;
  if (pisen_el.value == '')
    pisen_el.value = '000';
  var pisen;
  try
  {
    pisen = parseInt(pisen_el.value, 10);
  }
  catch (e)
  {
    pisen = 0;
  }
  pisen += n;
  if (pisen > 999)
    pisen = 999;
  if (pisen < 0)
    pisen = 0;
  pisen_el.value = int2str(pisen, 3);
}

/**
 * Zobrazení písně
 *
 */
function onPisenSend(e)
{
  var pisen_el = document.getElementById('pisen');
  if (pisen_el == undefined)
    return;
  if (pisen_el.value == '')
    pisen_el.value = '000';
  var pisen;
  try
  {
    pisen = parseInt(pisen_el.value, 10);
  }
  catch (e)
  {
    pisen = 0;
  }
  if (pisen < 0)
    pisen = 0;
  if (pisen > 999)
    pisen = 999;
  loadPagePisen(int2str(pisen, 3));
}

