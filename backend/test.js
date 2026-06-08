function debounce(func,wait)
{
    let timerID = null;
    return function(...args){
        if(timerID){
            clearTimeout(timerID)
        }
        timerID = setTimeout(()=>{
            func(...args)
        },wait)
    }
}

function func(){
    console.log("Action");
}

const debouncing = debounce(func,2000)
function runDebounce(){
if (typeof document !== "undefined") {
    document.addEventListener('click', debouncing);
} else if (typeof process !== 'undefined' && process.stdin) {
    const readline = require('readline');
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    console.log("No DOM detected. Press ENTER to trigger func (type 'exit' to quit).");
    rl.on('line', (line) => {
        if (line.trim().toLowerCase() === 'exit') {
            rl.close();
            process.exit(0);
        }
        debouncing()
    });
}
}
function selectionSort(array){
    let length = array.length 
    for(let i = 0; i<length; i++){
        let index = 0;
        let minValue = 10**9;
        for(let j = i; j< length; j++){
            if(array[j] < minValue){
                minValue = array[j]
                index = j
            }
        }
        let temp = array[index]
        array[index] = array[i]
        array[i] = temp;
    }
    return array;
}

function bubbleSort(array){
    length = array.length
    for(let i=0;i<length;i++){
        for(let j=0;j<length;j++){
            if(array[i]<array[j]){
                temp = array[i]
                array[i] = array[j]
                array[j] = temp; 
            }
            console.log("After every swap",array);
        }
        console.log("loop over");
    }
    return array
}

function insertionSort(){
    length = array.length
    for(let i=0;i<length;i++){
        key = array[i]
        j = i-1;
        while (j>-1 && key<array[j]){
            array[j+1] = array[j]
            j-=1;
        }
        array[j+1] = key;
    }
    return array;
}

function mergeSort(array){
    if (array.length<=1) return array
    const n = array.length
    const mid = Math.floor(n/2)

    const left_arr = mergeSort(array.slice(0,mid))
    const right_arr = mergeSort(array.slice(mid,n))
    // Two pointer merging two sorted array
    i=0
    j=0
    const comb = []
    while (i< left_arr.length && j< right_arr.length){
        if (left_arr[i]<right_arr[j]){
            comb.push(left_arr[i])
            i+=1
        }
        else{
            comb.push(right_arr[j])
            j++
        }
    }
    while(i<left_arr.length){
        comb.push(left_arr[i])
        i++
    }
    while(j<right_arr.length){
        comb.push(right_arr[j])
        j++
    }
    return comb    
}

// let array = [5,2,8,0,9,12,1]
// // array = selectionSort(array)
// // array = bubbleSort(array)
// array = mergeSort(array);
// console.log(array) 

const array =[1,2,3]
console.log(...array);

function curry(fn){
    return function curried(...args){
        if(args.length>=fn.length){
            return fn(...args)
        }
        else{
            return function(...nextArgs){
                return curried(...args,...nextArgs)
            }
        }
    }
}

function flat(arr) {
  let res = [];
  
  for (let i of arr) {
    if (Array.isArray(i)) {
      res.push(...flat(i));
    } else {
      res.push(i);
    }
  }
  return res;
}

const nestedArray = [1, [2, [3, 4], 5], 6];
console.log(flat(nestedArray));