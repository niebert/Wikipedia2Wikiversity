
function replaceStringReverse(pString,pReplace,pSearch)
//###### replaces in the string "pString" multiple substrings "pSearch" by "pReplace"
{
	return replaceString(pString,pSearch,pReplace);
}

function replaceString(pString,pSearch,pReplace)
//###### replaces in the string "pString" multiple substrings "pSearch" by "pReplace"
{
	//alert("cstring.js - replaceString() "+pString);
	if (pString != '') {
		var vHelpString = '';
        var vN = pString.indexOf(pSearch);
		var vReturnString = '';
		while (vN >= 0)
		{
			if (vN > 0)
				vReturnString += pString.substring(0, vN);
			vReturnString += pReplace;
            if (vN + pSearch.length < pString.length) {
				pString = pString.substring(vN+pSearch.length, pString.length);
			} else {
				pString = ''
			}
			vN = pString.indexOf(pSearch);
		};
	};
	return vReturnString + pString;
}


function el(pID) {
  return document.getElementById(pID)
}

function convertBracketLinks(pString)
{
  var vPrefix = el("prefix_wiki").value;
  // {{Further|Wikipedia:Ebola virus epidemic in Sierra Leone}}
  pString = pString.replace(/\{\{Further\|([^\|\}:]+)\}\}/gi,"{{Further|"+el("prefix_wiki").value+":$1}}");
  pString = pString.replace(/\{\{Further\|([^\|\}:]+)\|([^\|\]:]+)\}\}/gi,"{{Further|"+vPrefix+":$1|"+vPrefix+":$2}}");
 //{{Main|Wikipedia:West African Ebola virus epidemic timeline of reported cases and deaths}}
 pString = pString.replace(/\{\{Main\|([^\|\}:]+)\}\}/gi,"{{Main|"+vPrefix+":$1}}");
 //{{Main article|
 pString = pString.replace(/\{\{Main article\|([^\|\}:]+)\}\}/gi,"{{Main article|"+vPrefix+":$1}}");
 //  {{See also|Ebola virus epidemic in West Africa timeline}}
 pString = pString.replace(/\{\{See also\|([^\|\}:]+)\}\}/gi,"{{See also|"+vPrefix+":$1}}");
 return pString
}

function convertLinks(pString)
{
  var vPrefix = el("prefix_wiki").value;
  // {{Further|Wikipedia:Ebola virus epidemic in Sierra Leone}}
  //pString = pString.replace(/\{\{Further\|([^\|\}:]+)\}\}/g,"{{Further|"+el("prefix_wiki").value+":$1}}");
  //pString = pString.replace(/\{\{Further\|([^\|\}:]+)\|([^\|\]:]+)\}\}/g,"{{Further|"+el("prefix_wiki").value+":$1|"+el("prefix_wiki").value+":$2}}");
  pString = convertBracketLinks(pString);
  pString = pString.replace(/\[\[([^\|\]:]+)\|([^\|\]:]+)\]\]/g,"[["+vPrefix+":$1|$2]]");
	pString = pString.replace(/\[\[([^\|\]:]+)\]\]/g,"[["+vPrefix+":$1|$1]]");
	//pString = pString.replace(/\[\[([^\|]+)|([^\|\]]+)\]\]/g,"[[Wikipedia:$1|$2]]");
	//pString = pString.replace(/\[\[([A-Za-z0-9 \-\/]+)|([A-Za-z0-9 \-\/]+)\]\]/g,"[[Wikipedia:$1|$2]]");

	return pString
}
