

let n = 1000;

for (let i = n; i >= 0; i--) {
    console.log(Date.now() - 1000 * i + "," + i + "," + Math.sin(i) + "," + Math.cos(i) + "," + Math.random());
}