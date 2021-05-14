// script.js

import { router, setContent} from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('../sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

window.onpopstate = (event) => {
  setContent(event.state.pageType, event.state.entry);
};

const settingsIcon = document.querySelector('img[alt="settings"]');
settingsIcon.onclick = () => {router.setState('settings');};

const header = document.querySelector('header > h1');
header.onclick = () => {router.setState('home'); };

document.addEventListener('DOMContentLoaded', () => {
  router.setState('home');
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach((entry, index) => {
        entry.order = index;
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        newPost.onclick = () => { router.setState('entry', entry); };
        document.querySelector('main').appendChild(newPost);
      });
    });
});
