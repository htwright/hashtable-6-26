class HashMap {
  constructor(initialCapacity=8) {
    this.length = 0;
    this._slots = [];
    this._capacity = initialCapacity;
    this._deleted = 0;
  }

  get(key) {
    const index = this._findSlot(key);
    if (this._slots[index] === undefined) {
      throw new Error('Key error');
    }
    return this._slots[index].value;
  }

  set(key, value) {
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }
    const index = this._findSlot(key);
    this._slots[index] = {
      key,
      value,
      deleted: false
    };
    this.length++;
  }

  remove(key) {
    const index = this._findSlot(key);
    const slot = this._slots[index];
    if (slot === undefined) {
      throw new Error('Key error');
    }
    slot.deleted = true;
    this.length--;
    this._deleted++;
  }

  _findSlot(key) {
    const hash = HashMap._hashString(key);
    const start = hash % this._capacity;

    for (let i=start; i<start + this._capacity; i++) {
      const index = i % this._capacity;
      const slot = this._slots[index];
      if (slot === undefined || (slot.key == key && !slot.deleted)) {
        return index;
      }
    }
  }

  _resize(size) {
    const oldSlots = this._slots;
    this._capacity = size;
    this.length = 0;
    this._deleted = 0;
    this._slots = [];

    for (const slot of oldSlots) {
      if (slot !== undefined && !slot.deleted) {
        this.set(slot.key, slot.value);
      }
    }
  }
  /*
  */
  static _hashString(string) {
    let hash = 5381;
    for (let i=0; i<string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }
}

HashMap.MAX_LOAD_RATIO = 0.9;
HashMap.SIZE_RATIO = 3;


let hashArray = [{Hobbit:'Bilbo'}, {Hobbit:'Frodo'}, {Wizard:'Gandolf'}, {Human:'Aragon'},
    {Elf: 'Legolas'}, {Maiar:'The Necromancer'}, {Maiar: 'Sauron'}, {RingBearer: 'Gollum'},
    {LadyOfLight: 'Galadriel'}, {HalfElven: 'Arwen'}, {ShepherdOfTheTrees: 'Treebeard'}];

let hashTable = new HashMap();


hashArray.forEach(object => {
  let x = Object.keys(object).toString();
  hashTable.set(x, object[x]);
//   console.log(hashTable);
});

function checkPlaindrome (string) {
  const hm = new HashMap();
  let letters = {};
  let sum = 0;
  let letter;

  for(let i = 0; i < string.length; i++){
    letter = string[i];
    if(!(letter in letters)){
      hm.set(letter, 1);
      letters[letter] = 1;
    } else {
      let count = hm.get(letter);
      hm.set(letter, count+1);
    }
  }

  for(letter in letters){
    if(hm.get(letter) % 2 !== 0){
      sum ++;
    }
  }

  if(sum > 1){
    return false;
  } else {
    return true;
  }

}
console.log(checkPlaindrome('racecar'));

function anagrams (arr) {
  let results = {};
  let arr2 = arr.map(str => {
    return(str.split('').sort().join(''));
  });
  console.log(arr[2] + '   ' + arr2[2]);
  for(let string of arr2){
    results[string] = [];
  }
  for(let [index, string] of arr2.entries()){
    console.log(string);
    if(results[string].length > 0){
      results[string].push(arr[index]);
    } else {
      results[string].push(arr[index]);
    }
  }
  console.log(results);
  let returnArr = [];
  for(let key in results){
    let newArr = [];
    console.log(results);
    console.log(results[key]);
    for(let i = 0; i < results[key].length; i++){
      newArr.push(results[key][i]);
    }
    returnArr.push(newArr);
  }
  
  return returnArr;
}

console.log(anagrams(['hello', 'olleh', 'dad', 'add', 'racecar', 'carcrae', 'mom', 'omm']));