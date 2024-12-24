chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tabId = tabs[0].id; // Get the current tab's ID
  
    // Use the tabId to interact with the tab (e.g., send a message)
    chrome.tabs.sendMessage(tabId, { action: 'doSomething' }); 
  });
  