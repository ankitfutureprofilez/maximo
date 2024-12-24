chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      const tabId = tabs[0].id; // Get the current tab's ID
  
      // Use the tabId to interact with the tab (e.g., send a message)
      chrome.tabs.sendMessage(tabId, { action: 'doSomething' }, (response) => {
        if (chrome.runtime.lastError) {
          console.error('Error sending message:', chrome.runtime.lastError.message);
        } else {
          console.log('Response from content script:', response);
        }
      });
    } else {
      console.error('No active tab found.');
    }
  });
  