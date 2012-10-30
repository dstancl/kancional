/**
 * Ajaxová volání
 *
 */
function ajax(url)
{
  this.xmlhttp = null;
  this.failed = false;

  this.create();
  this.resetFunctions();
  this.resetVars();
}

ajax.prototype.create = function()
{
  try
  {
    this.xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
  }
  catch (e1)
  {
    try
    {
      this.xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    catch (e2)
    {
      this.xmlhttp = null;
    }
  }

  if (! this.xmlhttp)
  {
    if (typeof XMLHttpRequest != "undefined")
    {
      this.xmlhttp = new XMLHttpRequest();
    }
    else
    {
      this.failed = true;
    }
  }
}

ajax.prototype.setVar = function(name, value)
{
  this.vars[name] = value;
}

ajax.prototype.getVar = function(name)
{
  return name in this.vars ? this.vars[name] : null;
}

ajax.prototype.exportVars = function()
{
  var retval = new Array();
  for (key in this.vars)
  {
    retval[retval.length] = key+"="+this.vars[key];
  }
  return retval.join("&");
}

ajax.prototype.run = function(url)
{
  if (this.failed)
  {
    return this.onFailure();
  }
  if (!this.xmlhttp)
  {
    return this.onFailure();
  }
  this.setVar("rndVal", new Date().getTime());
  var self = this;
  url = url + '?' + this.exportVars();
  this.xmlhttp.open("GET", url, true);
  this.xmlhttp.onreadystatechange = function()
  {
    switch(self.xmlhttp.readyState)
    {
      case 1:
        self.onLoading();
        break; // 1
      case 2:
        self.onLoaded();
        break; // 2
      case 3:
        self.onInteractive();
        break; // 3
      case 4:
        self.responseText = self.xmlhttp.responseText;
        self.responseXML = self.xmlhttp.responseXML;
        self.responseStatus = self.xmlhttp.status;
	if (self.responseStatus == "200")
        {
          self.onCompletion();
        }
        else
        {
          self.onError();
        }
        break; // 4
    } // switch
  } // function
  this.xmlhttp.send(url);
}

ajax.prototype.resetFunctions = function()
{
  this.onFailure = function() { };
  this.onLoading = function() { };
  this.onLoaded = function() { };
  this.onInteractive = function() { };
  this.onCompletion = function() { };
  this.onError = function() { };
}

ajax.prototype.resetVars = function()
{
  this.vars = Array();
}

