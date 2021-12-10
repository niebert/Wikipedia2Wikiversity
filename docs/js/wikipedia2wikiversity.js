function el(pID) {
  return document.getElementById(pID)
};

function title4url() {
  // converts a title to a URL string
  return encodeURI(el("tTitle").value);
}

function getSourceURL () {
  var vURL = "https://"+el("sWikiLanguage").value + "." + el("sWikiDomain").value+".org/wiki/";
  vURL += title4url();
  return vURL;
}

function callWikiDisplay() {
  var vURL = getSourceURL();
  //document.location.href=vURL;
  window.open(vURL);
};

function getDate4Lang(pLang) {
    var d = new Date();
    var vDays = d.getDate();
    var vMonths = d.getMonth()+1;
    var vYear = d.getFullYear();
    var vDateStr = "";
    switch (pLang) {
      case "de":
        vDateStr = vDays + "." + vMonths + "." + vYear;
      break;
      case "en":
        vDateStr = vMonths + "/" + vDays +  "/" + vYear;
      break;
      default:
        vDateStr = vYear + "/"  + vMonths + "/" + vDays;
    }
    return vDateStr;
}

function firstUpperCase(pString) {
    return pString.charAt(0).toUpperCase() + pString.slice(1);
}

function get_header_info(pLang) {
  var out = "";
  switch (pLang) {
    case "de":
      out += "== Seiten-Information ==";
    break;
    default:
        out += "== Page Information ==";
  }
  return out;
}

function get_domain() {
  return el("sWikiDomain").value;
}

function get_language() {
  return el("sWikiLanguage").value;
}

function get_title() {
    return el("tTitle").value;
}

function get_history_link(pLang) {
  var vURL = "https://" + pLang + "." + get_domain() + ".org";
  vURL += "/w/index.php?action=history&title=" + title4url();
  return vURL;
}

function wikipedia2wikiversity_link() {
  var vURL = "https://niebert.github.io/Wikipedia2Wikiversity?";
  vURL += "lang="+get_language()+"&";
  vURL += "domain="+get_domain()+"&";
  vURL += "title="+title4url();
  return vURL;
}

function append_source_info () {
  var out = "\n";
  var vLang = get_language();
  var vURL = getSourceURL();
  var vDomain = firstUpperCase(get_domain());
  var vHeader = get_header_info(vLang);
  switch (vLang) {
    case "de":
      out += "\n"+vHeader;
      out += "\nDiese Seite wurde auf Basis der folgenden [" + vURL + " "+vDomain+"-Quelle] erstellt:";
      out += "\n* [" + vURL + " "+get_title()+"] "+vURL;
      out += "\n* Datum: "+getDate4Lang(vLang) + " - [" + get_history_link(vLang) + " Versionsgeschichte "+vDomain+ "]";
      out += "\n* [" + wikipedia2wikiversity_link() +" Wikipedia2Wikiversity-Konverter]: https://niebert.github.io/Wikipedia2Wikiversity";
      out += "\n";
    break;
    default:
      out += "\n"+vHeader;
      out += "\nThis page was based on the following [" + vURL + " "+vDomain+" source page]:";
      out += "\n* [" + vURL + " "+el("tTitle").value+"] "+vURL;
      out += "\n* Date: "+getDate4Lang(vLang) + " - [" + get_history_link(vLang) + " Source History "+vDomain+ "]";
      out += "\n* [" + wikipedia2wikiversity_link() +" Wikipedia2Wikiversity-Converter]: https://niebert.github.io/Wikipedia2Wikiversity";
      out += "\n";
  }
  out += "";
  return out;
}

function info_exists(pString) {
  var vLang = el("sWikiLanguage").value;
  var vHeader = get_header_info(vLang);
  var vRet = "NO";
  if (pString && (pString.indexOf(vHeader) > 0)) {
    vRet = "YES";
  }
  console.log("Info-Section exists? "+vRet);
  return vRet;
}

function callWikiSource() {
    //document.location.href=vURL;
  //window.open(vURL);
  var vLog = "CALL: callWikiSource() - Title: '" + el("tTitle").value + "'";
  vLog  += " Language: '" + el("sWikiLanguage").value + "'";
  vLog  += " Domain: '" + el("sWikiDomain").value+"'";
  console.log(vLog);
  wtf_fetch.getPage(el("tTitle").value , el("sWikiLanguage").value ,el("sWikiDomain").value, function(err, doc) {
    // doc contains the download
    // console.log(JSON.stringify(doc.wiki))
    el("tWikiSource").value = doc.wiki;
    if (info_exists(doc.wiki) == "NO") {
      el("tWikiSource").value = doc.wiki + append_source_info();
    }
    //console.log(doc);
  });
};

function BracketLinks2Wikiversity()
{
	var vString = document.fconvert.wikisource.value;
  vString = convertBracketLinks(vString);
	document.fconvert.wikisource.value = vString;
}

function Wikipedia2Wikiversity()
{
	var vString = document.fconvert.wikisource.value;
  vString = convertBracketLinks(vString);
  vString = convertLinks(vString); // + append_source_info();
  console.log("Source Info:\n"+append_source_info());
  if (info_exists(vString) == "NO") {
    console.log("Append Source Info:");
    vString = vString + append_source_info();
  }

	document.fconvert.wikisource.value = vString;
}

function setWikiLanguage(pLang) {
  var vDomain = el("sWikiDomain").value;
  switch (vDomain) {
    case "wikipedia":
      vDomain = "w";
    break;
    case "wikiversity":
      vDomain = "v";
    break;
    case "wikibooks":
      vDomain = "b";
    break;
    default:

  }
  el("prefix_wiki").value = vDomain + ":"+pLang;
}
