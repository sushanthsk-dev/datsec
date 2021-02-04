/*let a = new Array();
a = [5, 4, 3];
n = 3;

for (let i = 0; i < a.length; i++) {
  let temp = a[i]; // 3  i = 2
  let ptr = i - 1; // 1
  while (temp < a[ptr] && ptr >= 0) {
    // 3<5 && 1>0
    a[ptr + 1] = a[ptr]; // a[2] = 5;  a[1] = 4;
    ptr = ptr - 1; // 0
  } // a[0] = 4 a[1] = 5 a[2] =3
  a[ptr + 1] = temp; // a[0]= 3
  for (let i = 0; i < a.length; i++) {
    console.log(a[i]);
  }
  console.log('\n');
}
*/
/*
let a = new Array();
a = [10, 7, 2, 8, 9];

for (let i = 0; i < a.length; i++) {
  let ptr = i - 1;
  temp = a[i];
  while (temp < a[ptr] && ptr >= 0) {
    a[ptr + 1] = a[ptr];
    ptr = ptr - 1;
  }

  console.log('\n');
  a[ptr + 1] = temp;
  for (let i = 0; i < a.length; i++) {
    console.log(a[i]);
  }
}
*/

// let a = new Array();
// a = [10, 5, 2, 6, 8, 20];

// function partition(arr, low, high) {
//   let pivot = a[high];
//   let i = low - 1;
//   for (j = low; j < high; j++) {
//     if (a[j] < pivot) {
//       i++;
//       let temp = a[i];
//       a[i] = a[j];
//       a[j] = temp;
//     }
//   }
//   let temp = a[i + 1];
//   a[i + 1] = a[high];
//   a[high] = temp;
//   return i + 1;
// }

// function sort(a, low, high) {
//   a.forEach((el) => {
//     console.log(el);
//   });
//   console.log('\n');
//   if (low < high) {
//     let pi = partition(a, low, high);
//     sort(a, low, pi - 1);
//     sort(a, pi + 1, high);
//   }
// }

// sort(a, 0, a.length - 1);

// a.forEach((el) => {
//   console.log(el);
// });
// function sort() {
//   let a = 'Hello';
//   let ch = '';
//   let j = 0;

//   for (let i = a.length - 1; i >= 0; i--) {
//     ch = ch + a[i];
//   }
//   console.log(ch);
// }

// sort();

function func() {
  let a = new Array();
  a = [10, 5, 2, 6, 8, 20];
  let min = a[0];
  let secMin = a[1];
  for (let i = 0; i < a.length; i++) {
    if (min > a[i]) {
      min = a[i];
      if (min > secMin) {
        let temp = secMin;
        secMin = min;
        min = temp;
      }
    }
  }
  console.log(min, secMin);
}

func();
