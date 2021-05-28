(function () {
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  browser.runtime.onMessage.addListener((time) => {
    document.querySelector("video").currentTime = time;
  });
})();
