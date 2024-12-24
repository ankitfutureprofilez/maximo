chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'doSomething') {
      // Perform the action
      console.log('Action received in content script');
      sendResponse({ status: 'done' });
    }
  });
  