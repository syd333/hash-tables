// ** HASH TABLES
// used to store key-value pairs
// keys are not ordered
// fast for finding values, adding new values etc

// BIG O NOTATION (avg)
// insert = O(1)
// delete = O(1)
// access = O(1)

// keys can be more descriptive instead of indices
// colors["blue"] instead of colors[2]
// more human readability keys 

// in order to look up values by key, 
    // we need a way to convert keys into valid array indices
// a function performs this task = HASH FUNCTION

// HASH FUNCTION
// only hashing strings
function hash(key, arrayLen) {
    let total = 0;
    for (let char of key) {
      // map "a" to 1, "b" to 2, "c" to 3, etc.
      let value = char.charCodeAt(0) - 96
        //UTF = "h".charCodeAt() - 96 // will give us number place in alphabet
      // map through each letter and add them together 
      total = (total + value) % arrayLen;
    }
    return total;
  }

  hash("pink", 10) // 0
  hash("cyan", 10) // 3

// IMPROVED HASH FUNCTION
function hash(key, arrayLen) {
    let total = 0;
    let WEIRD_PRIME = 31;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      let char = key[i];
      let value = char.charCodeAt(0) - 96
      total = (total * WEIRD_PRIME + value) % arrayLen;
    }
    return total;
  }

  hash("hello", 13) // 7
  hash("goodbye", 13) // 9

  // COLLISIONS
  // separate chaining = storing data at same spot but in a nested way
  // linear probing = only storing data at single spot, look for next empty spot

  class HashTable {
    constructor(size=53){
      this.keyMap = new Array(size);
    }
  
    _hash(key) {
      let total = 0;
      let WEIRD_PRIME = 31;
      for (let i = 0; i < Math.min(key.length, 100); i++) {
        let char = key[i];
        let value = char.charCodeAt(0) - 96
        total = (total * WEIRD_PRIME + value) % this.keyMap.length;
      }
      return total;
    }
    // using separate chaining aka nesting 
    set(key,value){
        // hash the key & save to variable
      let index = this._hash(key);
        //insert key and value at 'index'
        // if there is not any keys at index spot
      if(!this.keyMap[index]){
          // if not set to empty array
        this.keyMap[index] = [];
      }
      // push [key, value] into said index
      this.keyMap[index].push([key, value]);
    }
    get(key){
        // has key
      let index = this._hash(key);
      // there is a key at this index
      if(this.keyMap[index]){
          // map through if nested(chaining)
        for(let i = 0; i < this.keyMap[index].length; i++){
            // want to return subarray
            // if key that was passed into function matches either key to one of nested keys
          if(this.keyMap[index][i][0] === key) {
              // then return the value 
            return this.keyMap[index][i][1]
          }
        }
      }
      // otherwise return undefined
      return undefined;
    }
    // collects all keys and returns them in an array
    keys(){
        let keysArr = [];
        for(let i = 0; i < this.keyMap.length; i++){
          if(this.keyMap[i]){
            for(let j = 0; j < this.keyMap[i].length; j++){
              if(!keysArr.includes(this.keyMap[i][j][0])){
                keysArr.push(this.keyMap[i][j][0])
              }
            }
          }
        }
        return keysArr;
      }
      // collects all values and returns them in an array 
      values(){
        let valuesArr = [];
        // loop through entire keymap
        for(let i = 0; i < this.keyMap.length; i++){
            // if keymap exists with no empty arrays
          if(this.keyMap[i]){
              // loop through arrays w no empties
            for(let j = 0; j < this.keyMap[i].length; j++){
                // need unique values
                // only push values from keymap not key!
                // but if they are not included already in values array (!valuesArr)
              if(!valuesArr.includes(this.keyMap[i][j][1])){
                valuesArr.push(this.keyMap[i][j][1])
                // push into array
              }
            }
          }
        }
        return valuesArr;
      }
  }
  
  let ht = new HashTable(17);
  ht.set("maroon","#800000")
  ht.set("yellow","#FFFF00")
  ht.set("olive","#808000")
  ht.set("salmon","#FA8072")
  ht.set("lightcoral","#F08080")
  ht.set("mediumvioletred","#C71585")
  ht.set("plum","#DDA0DD")

  ht.keys().forEach(function(key){
    console.log(ht.get(key));
  })
  
  