let form = document.querySelector("#fileSenderForm");

//add event listener
form.addEventListener("submit", (e) => {
    e.preventDefault();
console.log("second form clicked")
  let data = new FormData(form);
  fetch('https://script.google.com/macros/s/AKfycbwsm1gxTiPhL3qTurAm163tLAEn-EojNqeq_39reNbIhk_u2Kq43vEoO922acabx5WR/exec', {
    method: "POST",
    body: data,
    mode: "no-cors"
  })
    .then(res => res.text())
    .then(data => {
      document.querySelector("#msg").innerHTML = data;
    })
    .catch(err => {
      document.querySelector("#msg").innerHTML = err;
    });
});
