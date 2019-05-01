import fuzzysort from 'fuzzysort';

export function fuzzySort(query, objects, keys) {
    return fuzzysort.go(query, objects, keys);
}

export function highlightResult(sortedElement, open = '<b>', close='</b>') {
    return fuzzysort.highlight(sortedElement, open, close);
}
