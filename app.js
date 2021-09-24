const user = document.getElementsByTagName("custom-user")[0];

user.addEventListener("button", (e) => {
  user.setAttribute("active", e.detail);
  console.log("LOAD DATASET FOR - ", e.detail);
});
