/**
 * @param objects List of objects to be scanned.
 *
 * @returns `domainMap` which contains information about possible values
 * taken by keys present in all the given objects.
 */
function extractPropertyDomain(objects) {
  return objects.reduce((domainMap, obj) => {
    Object.keys(obj).forEach(key => {
      if (!domainMap[key]) {
        domainMap[key] = [];
      }
      if (!domainMap[key].some(v => v === obj[key])) {
        domainMap[key].push(obj[key]);
      }
    });
    return domainMap;
  }, {});
}

/**
 * Generates tags for given list of objects on their key, value space.
 * This is useful in automatically generating tag based filters.
 * 
 * Eg., Objects -> [
 *  { "foodType": "burger", "size": "small" }.
 *  { "foodType": "burger", "size": "large" },
 *  { "foodType": "pizza", "size": "small" },
 *  { "foodType": "pizza", "size": "large" }
 * ]
 * 
 * Output -> [
 *  {
 *    "displayText": "size-small",
 *    "property": "size",
 *    "value": "small"
 *  }.
 *  {
 *    "displayText": "size-large",
 *    "property": "size",
 *    "value": "large"
 *  },
 *  {
 *    "displayText": "foodType-burger",
 *    "property": "foodType",
 *    "value": "burger"
 *  },
 *  {
 *    "displayText": "foodType-pizza",
 *    "property": "foodType",
 *    "value": "pizza"
 *  }
 * ]
 * 
 * @param {*} objects 
 */
export function tagGenerator(objects) {
  return Object.entries(extractPropertyDomain(objects)).reduce(
    (tags, [property, values]) =>
      tags.concat(
        values.map(v => ({
          displayText: `${property}=${v}`,
          property,
          value: v
        }))
      ),
    []
  );
}

export function tagsAreEqual(tagA, tagB) {
  return tagA.property === tagB.property && tagA.value === tagB.value;
}

export function matchesTagCriterion(object, tag) {
  return object[tag.property] === tag.value;
}
