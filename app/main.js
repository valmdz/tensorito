const rivets = require('rivets');
const config = require('./config');

const client = (() => {
  if(config.production) {
    const matrix = require('matrix-js-sdk');
    return matrix.createClient('https://matrix.org');
  } else {
    const mockData = require('./data');
    return {
      publicRooms: (f) => {
        f(null, mockData);
      }
    };
  }
})();

const init = () => {
  // Here we can access the DOM.
  const $chatRooms = document.querySelector('#chat-rooms');
  client.publicRooms((_, data) => {
    rivets.bind($chatRooms, data);
  });
};

document.addEventListener('DOMContentLoaded', init);
