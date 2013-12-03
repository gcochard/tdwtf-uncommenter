// ==UserScript==
// @name       Uncomment comments
// @namespace  http://github.com/gcochard/tdwtf-uncommenter
// @version    0.1
// @description  Uncomments humorous article body comments on TDWTF
// @match      http://thedailywtf.com/*
// @copyright  2013+, Greg Cochard
// ==/UserScript==


var commentsArr = [];
/*
 * Shamelessly ripped from http://stackoverflow.com/a/13364065/1355166
 * Updated by me to work recursively!
 * 
 * Gathers all nodes that are comments
 * @param elem The element to traverse, pass body if you want all comments in the body
 * @returns comments An array containing comment nodes
 */
// Thanks to Yoshi
Node = Node || {
    COMMENT_NODE: 8
};

function getComments(elem) {
    var children = elem.childNodes;
    
    for (var i=0, len=children.length; i<len; i++) {
        if (children[i].nodeType == Node.COMMENT_NODE) {
            commentsArr.push(children[i]);
        } else if(children[i].childNodes.length) {
            getComments(children[i]);
        }
            }
}
/*
 * end ripped off section
 */
getComments(document.getElementById('MainContent'));
if(commentsArr.length && confirm('Unhide comments?')){
    var temp = null;
    for(var i=0,ii=commentsArr.length;i<ii;i++){
        temp = document.createElement('span');
        temp.style.color='#888';
        temp.innerHTML = '&lt;--'+commentsArr[i].nodeValue+'--&gt';
        commentsArr[i].parentNode.replaceChild(temp,commentsArr[i]);
        temp = null;
    }
    console.log('comments transformed!');
}
