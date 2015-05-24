(function (window) {
    'use strict';

    if (typeof window.mashtots !== 'object') {
        return;
    }

    function isInArray(needle, haystack) {
        var key, val;
        needle = needle.toLowerCase();
        for (key in haystack) {
            if (haystack.hasOwnProperty(key)) {
                val = haystack[key].toLowerCase();
                if (val === needle) {
                    return true;
                }
            }
        }
        return false;
    }

    function replaceInDomTimeout(element, exeptions, filters, callback, attributes) {
        setTimeout(function () {
            replaceInDom(element, exeptions, filters, callback, attributes);
        }, 0);
    }

    function replaceWithExeptions(text, exeptions, callback) {
        var footnotes = [],
            regexp,
            matches,
            j,
            k;
        for (j = 0; j < exeptions.length; j++) {
            regexp = new RegExp(exeptions[j], 'gm');
            matches = text.match(regexp);
            if (matches) {
                for (k = 0; k < matches.length; k++) {
                    text = text.replace(matches[k], '#' + j + '#' + k + '#');
                }
            }
        }
        text = callback(text);
        if (footnotes.length) {
            for (j = 0; j < footnotes.length; j++) {
                if (footnotes[j] !== null) {
                    for (k = 0; k < footnotes[j].length; k++) {
                        text = text.replace('#' + j + '#' + k + '#', footnotes[j][k]);
                    }
                }
            }
        }
        return text;
    }

    // TODO: method is too big, separate it
    function replaceInDom(element, exeptions, filters, callback, attributes) {
        var i, filter, attrs, findedElements, findedElement, attribute, elementAttribute,
            title, alt, value, doc, node;
        if (typeof element === 'string') {
            return callback(element);
        }
        if (typeof filters === 'object' && filters !== null) {
            for (filter in filters) {
                if (filters.hasOwnProperty(filter)) {
                    attrs = filters[filter];
                    findedElements = element.getElementsByTagName(filter);
                    for (i = 0; i < findedElements.length; i++) {
                        findedElement = findedElements[i];
                        replaceInDomTimeout(findedElement, exeptions, undefined, callback, attrs);
                    }
                }
            }
            return;
        }
        if (typeof attributes === 'object' && attributes !== null) {
            if (typeof element.attributes === 'object') {
                for (attribute in attributes) {
                    if (attributes.hasOwnProperty(attribute)) {
                        if (attribute[0] !== '$') {
                            elementAttribute = element.attributes[attribute];
                            if (typeof elementAttribute !== 'string' || !isInArray(elementAttribute.value, attributes[attribute])) {
                                return;
                            }
                        }
                    }
                }
            } else if (typeof attributes.$function !== 'function') {
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
        if (typeof title === 'string') {
            element.setAttribute('title', callback(title));
        }
        if (typeof alt === 'string') {
            element.setAttribute('alt', callback(alt));
        }
        if (typeof value === 'string') {
            element.value = callback(value);
        }
        if (element instanceof HTMLIFrameElement) {
            try {
                doc = element.contentDocument || element.contentWindow.document;
                if (doc !== undefined) {
                    replaceInDomTimeout(doc.getElementsByTagName('body')[0], exeptions, undefined, callback);
                }
            } catch (e) {
                return;
            }
            return;
        }

        for (i = 0; i < element.childNodes.length; i++) {
            node = element.childNodes[i];
            if (node instanceof Text) {
                if (typeof exeptions === 'object') {
                    console.log(node.data);
                    node.data = replaceWithExeptions(node.data, exeptions, callback);
                } else {
                    node.data = callback(node.data);
                }
            } else if (!(node instanceof Comment)) {
                replaceInDomTimeout(node, exeptions, undefined, callback);
            }
        }
    }

    function sovietToMashtotsDom(element, exeptions, filters) {
        replaceInDom(element, exeptions, filters, function (text) {
            return window.mashtots.sovietToMashtots(text);
        });
    }

    function mashtotsToSovietDom(element, exeptions, filters) {
        replaceInDom(element, exeptions, filters, function (text) {
            return window.mashtots.mashtotsToSoviet(text);
        });
    }

    window.mashtots.exeptions = [];
    window.mashtots.sovietToMashtotsDom = sovietToMashtotsDom;
    window.mashtots.mashtotsToSovietDom = mashtotsToSovietDom;
}(window));
