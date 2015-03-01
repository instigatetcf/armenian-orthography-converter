(function (window) {
    'use strict';

    function isInArray(needle, haystack) {
        var key, val;
        needle = needle.toLowerCase();
        for (key in haystack) {
            val = haystack[key].toLowerCase();
            if (val === needle) {
                return true;
            }
        }
        return false;
    }

    function replaceInDomStack(element, exeptions, filters, callback, attributes) {
        setTimeout(function () {
            replaceInDom(element, exeptions, filters, callback, attributes);
        }, 0);
    }

    // TODO: method is too big, separate it
    function replaceInDom(element, exeptions, filters, callback, attributes) {
        var i, filter, attrs, findedElements, findedElement, attribute, elementAttribute,
            title, alt, value, doc, node;
        if (typeof filters === 'object' && filters !== null) {
            for (filter in filters) {
                if (filters.hasOwnProperty(filter)) {
                    attrs = filters[filter];
                    findedElements = element.getElementsByTagName(filter);
                    for (i = 0; i < findedElements.length; i++) {
                        findedElement = findedElements[i];
                        replaceInDomStack(findedElement, exeptions, undefined, callback, attrs);
                    }
                }
            }
            return;
        }
        if (typeof attributes === 'object' && attributes !== null) {
            if (typeof element.attributes !== 'undefined') {
                for (attribute in attributes) {
                    if(attributes.hasOwnProperty(attribute)) {
                        if (attribute[0] !== '$') {
                            elementAttribute = element.attributes[attribute];
                            if (typeof elementAttribute === 'undefined' || !isInArray(elementAttribute.value, attributes[attribute])) {
                                return;
                            }
                        }
                    }
                }
            } else if (typeof attributes.$function === 'undefined') {
                return;
            }
            if (typeof attributes.$function === 'function') {
                if (!attributes.$function(element)) {
                    return;
                }
            }
        }
        title = element.getAttribute('title');
        alt = element.getAttribute('alt');
        value = element.value;
        if (title !== null) {
            element.setAttribute('title', callback(title));
        }
        if (alt !== null) {
            element.setAttribute('alt', callback(alt));
        }
        if (typeof value === 'string') {
            element.value = callback(value);
        }
        if (element instanceof HTMLIFrameElement) {
            try {
                doc = element.contentDocument || element.contentWindow.document;
                if (doc !== undefined) {
                    replaceInDomStack(doc.getElementsByTagName('body')[0], exeptions, undefined, callback);
                }
            }  catch (e) {
                return;
            }
            return;
        }

        for (i = 0; i < element.childNodes.length; i++) {
            node = element.childNodes[i];
            if (node instanceof Text) {
                if (typeof exeptions === 'object') {
                    node.data = replace(node.data, exeptions, callback);
                } else {
                    node.data = callback(node.data);
                }
            } else if (!(node instanceof Comment)) {
                replaceInDomStack(node, exeptions, undefined, callback);
            }
        }
    }

    function toMashtotsDom(element, exeptions, filters) {
        replaceInDom(element, exeptions, filters, function (text) {
            window.toMashtots(text);
        });
    }

    function toSovietDom(element, exeptions, filters) {
        replaceInDom(element, exeptions, filters, function (text) {
            window.toSoviet(text);
        });
    }

    window.toMashtotsDom = toMashtotsDom;
    window.toSovietDom = toSovietDom;
}(window));