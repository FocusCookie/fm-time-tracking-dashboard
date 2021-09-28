const user = document.getElementsByTagName("custom-user")[0];
const activityElements = {
  work: document.getElementById("work"),
  play: document.getElementById("play"),
  study: document.getElementById("study"),
  exercise: document.getElementById("exercise"),
  social: document.getElementById("social"),
  selfcare: document.getElementById("selfcare"),
};

readJsonFile = async function (path) {
  try {
    const file = await fetch(path);
    const data = await file.json();

    return data;
  } catch (error) {
    throw new Error(Error);
  }
};

readJsonFile("./data.json")
  .then((timeframes) => {
    timeframes.forEach((activity) => {
      activityElements[activity.title].timeframes = activity.timeframes;
    });
  })
  .catch((err) => console.log(err));

user.addEventListener("button", (e) => {
  user.setAttribute("active", e.detail);
  console.log("LOAD DATASET FOR - ", e.detail);
});
