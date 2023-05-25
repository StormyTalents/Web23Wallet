/*global chrome*/
///<reference types="chrome"/>

chrome.runtime.onInstalled.addListener(() => {
  //this is just an example
  //   chrome.storage.sync.set({ color });
  //   console.log('Default background color set to %cgreen', `color: ${color}`);
});

// chrome.action.onClicked.addListener(function (listener) {
//   openExtension();
// });

// function openExtension() {
//   var options_url = chrome.runtime.getURL("/index.html");
//   chrome.tabs.query(
//     {
//       url: chrome.runtime.getURL("/*"),
//     },
//     function (tabs) {
//       if (tabs.length === 0) {
//         chrome.tabs.create(
//           {
//             url: options_url,
//             active: false,
//           },
//           function (tab) {
//             // After the tab has been created, open a window to inject the tab
//             chrome.windows.create({
//               tabId: tab.id,
//               type: "popup",
//               focused: true,
//               width: 400,
//               height: 640,
//               // incognito, top, left, ...
//             });
//           }
//         );
//       } else {
//         // If there's more than one, close all but the first
//         for (var i = 1; i < tabs.length; i++) chrome.tabs.remove(tabs[i].id);
//         // And focus the options page
//         chrome.tabs.update(tabs[0].id, { active: true });
//         chrome.windows.update(tabs[0].windowId, { focused: true });
//       }
//     }
//   );
// }
