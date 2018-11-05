# Wikipedia2Wikiversity
Link converter for text fragments of Wikipedia sources that are used in Wikiversity.
Copy text fragments of Wikipedia into the textarea of the demo and press the 'Convert Links' button in the following demo.

* [Link Converter Demo](https://niebert.github.io/Wikipedia2Wikiversity)

The web source of the Demo link mentioned above is stored in the subdirectory `/docs`. Please feel free to fork the repository and alter the source code according to your needs. To publish YOUR link converter on Github as well, change the link in this README.md to your repository.


## See also
* [Wikipedia2Wikiversity](https://niebert.github.io/Wikipedia2Wikiversity) uses  [`wtf_fetch`](https://niebert.github.io/Wikipedia2Wikiversity) to download the Wikipedia sources from the MediaWiki-API and convert the links for application in Wikiversity.
* [`wtf_wikipedia`](https://github.com/spencermountain/wtf_wikipedia/) is the source repository developed by [Spencer Kelly](https://github.com/spencermountain), who created that great library for Wikipedia article processing which contain `wtf_fetch` as submodule.
* [Wiki2Reveal](https://niebert.github.io/Wiki2Reveal) that uses `wtf_fetch` and `wtf_wikipedia` to download Wikipedia sources and convert the wiki sources "on-the-fly" into a RevealJS presentation (see [Wiki2Reveal Example](https://niebert.github.io/Wiki2Reveal/wiki2reveal.html?domain=wikiversity&title=Normen%2C+Metriken%2C+Topologie&author=Funktionalanalysis&language=de) ).
