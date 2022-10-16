let data = require('./data');

'use strict'

const args = process.argv

function isEmpty(arr) {
  return (Array.isArray(arr) && arr.length)
}

// This function filters out every animal that does not match the string pattern
const removeNonMatching = (searchedStr, person) => {
  return person.animals.map((animal) => {
      if (animal.name.includes(searchedStr)) {
        return animal;
      }
    }).filter(e => e)
}

const filter = (searchedStr) => {
  const newList = data.filter(q => {
    let newCountry = q
    newCountry.people = q.people.filter(p => {
      let newPerson = p
      newPerson.animals = removeNonMatching(searchedStr, p)

      // The 'animals' entry will be removed if there is nothing left inside
      return isEmpty(newPerson.animals)
    })

    // The 'people' entry will be removed if there is nothing left inside
    return isEmpty(newCountry.people)
  });

  // prints out the filtered list if there is any match
  return !isEmpty(newList) ? 'Nothing found' : JSON.stringify(newList)
}
// This function finds a strings in an array
const find = (array, string) => {
  return array.find((element) => element.includes(string))
}

const findFilter = find(args, 'filter') ? find(args, 'filter') : null
const findCount = find(args, 'count') ? find(args, 'count') : null
const filterStr = findFilter ? findFilter.split('=') : null

//extract the string we want to filter with
const containingStr = filterStr ? filterStr[1] : null

//if we have a filter we filter the data with otherwise we return the initial data
 data =
 findCount && findFilter ? JSON.parse(filter(containingStr)) : data

const count = () => {
  const newList = data.map((country) => {
    country.people.map((person) => {
      person.name = `${person.name} [${person.animals.length}]`
      return person
    })
    country.name = `${country.name} [${country.people.length}]`
    return country
  })
  return JSON.stringify(newList)
}

// USAGE: node app.js --filter=[PATTERN] OR node app.js filter=[PATTERN]
// USAGE: node app.js --count OR node app.js count
// USAGE: node app.js --filter=[PATTERN]  --count OR --count --filter=[PATTERN]
try {
  if (findCount) {
    console.log(count())
  } else if (!findCount && findFilter) {
    console.log(filter(containingStr))
  } else {
    console.log('Wrong arguments')
  }
} catch (err) {
  throw err
}

module.exports = {
  count,
  filter,
}
