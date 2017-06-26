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
//hash function returns the index where the key will be stored
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
        // Reset the length - it will get rebuilt as you add the items back
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
  console.log(hashTable);
});

//hashTable.set raccear = 'raccear'
//let x = hashTable.get(raccear);
//hashTable.set(rreaacc)
//let y = hashTable.get(rreaacc);
//if (x === y)return true else return false
//TaChyla
//alyhCaT
//theoretically, the index returned should be the same reguardless of order.
//not only is this false, if it were true it would be true for non palindromes as well.

//initialize a new hash table
//write each character into it
//if there is more than one odd numbered character return false
//else return true


//can a hash table be useful here without continuous chaining?

function checkPlaindrome (string) {
  const letterCount = {};
  const hm = new HashMap();
  let counts = [];
  let sum = 0;
  let letter;

  for(let i = 0; i < string.length; i++){
    letter = string[i];
    if(hm.get(letter) === undefined){
      hm.set(letter, 1);
      letters.push(letter);
    } else {
      let count = hm.get(letter);
      hm.set(letter, count+1);
    }
  }

  for(let i = 0; i < string.length; i++){
    counts.push(hm.get(string[i]));
  }
  
  for(let i = 0; i < counts.legnth; i++){
    if (counts[i] % 2 !== 0){
      sum ++;
    }
  }

  if(sum > 1){
    return false;
  } else {
    return true;
  }


  // for(let i = 0; i < string.length; i++){
  //   letter = string[i];
  //   if(letterCount[letter] > 0){
  //     letterCount[letter]++;
  //   } else {
  //     letterCount[letter] = 1;
  //   }
  // }


  // for (let count in letterCount){
  //   let x = letterCount[count];
  //   if(x % 2 !== 0){
  //     sum ++;
  //   }
  // }
  // if(sum > 1){
  //   return false;
  // } else {
  //   return true;
  // }
}
console.log(checkPlaindrome(''));