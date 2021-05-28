function reportError(error) {
  console.error(`Could not beastify: ${error}`);
}
async function isYoutube() {
  let [tab] = await browser.tabs.query({ active: true, currentWindow: true });
  if (tab.url) {
    var regExp =
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (tab.url.match(regExp)) {
      return true;
    }
  }
  return false;
}

function main() {
  // if (!(await isYoutube())) {
  //   document.body.innerHTML = "This is not youtube";
  //   return 0;
  // }

  const goButton = document.querySelector("#changeTime");
  const hrsInput = document.querySelector("#hrs");
  const minsInput = document.querySelector("#mins");
  const secsInput = document.querySelector("#secs");
  const timePoint =
    Number(hrsInput.value) * 60 * 60 +
    Number(minsInput.value) * 60 +
    Number(secsInput.value);
  goButton.addEventListener("click", () => {
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      console.log("hey");
      browser.tabs.sendMessage(tabs[0].id, {
        timePoint
      });
    });
  });
}
browser.tabs
  .executeScript({ file: "/content_scripts/content.js" })
  .then(main)
  .catch(() => console.log("heyerror"));
