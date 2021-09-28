const user = document.getElementsByTagName("custom-user")[0];
const work = document.getElementById("work");
let timeframes;

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
  .then((data) => {
    timeframes = data;

    console.log(
      timeframes.filter((elem) => elem.title === "Work")[0].timeframes
    );

    work.timeframes = timeframes.filter(
      (elem) => elem.title === "Work"
    )[0].timeframes;
    //TODO: filter each timeframe into each element - create elements on top like the work one
  })
  .catch((err) => console.log(err));

user.addEventListener("button", (e) => {
  user.setAttribute("active", e.detail);
  console.log("LOAD DATASET FOR - ", e.detail);
});

//TODO: Handling the clicks on the user type and switch data in the custom avtivity cards
