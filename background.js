chrome.runtime.onMessage.addListener(
  async function (request, sender, sendResponse) {
    if (request.message === "login") {
      chrome.scripting.executeScript({
        target: { tabId: request.tabId },
        args: [{ email: request.email, password: request.password, bookType: request.bookType }],
        func: vars => Object.assign(self, vars),
      }, () => {
        chrome.scripting.executeScript({ target: { tabId: request.tabId }, files: ['./scripts.js'] });
      });
    } else if (request.message === "services") {

      //await chrome.runtime.sendMessage({ message: "books", links: request.links })
    }
  }
);