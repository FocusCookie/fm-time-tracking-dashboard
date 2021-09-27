const user = document.getElementsByTagName("custom-user")[0];
const work = document.getElementById("work");

user.addEventListener("button", (e) => {
  user.setAttribute("active", e.detail);
  console.log("LOAD DATASET FOR - ", e.detail);
});

setTimeout(() => {
  work.timeframes = { current: 5, previous: 7 };
}, 3000);

//TODO: Handling the clicks on the user type and switch data in the custom avtivity cards
