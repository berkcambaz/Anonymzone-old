/**
 * 
 * @param {HTMLTextAreaElement} elem 
 */
function sizeTextareaDynamic(elem) {
    elem.style.height = "0";
    elem.style.height = elem.scrollHeight.toString() + "px";
}