const matrix = require('matrix-js-sdk');
// const client = matrix.createClient('https://matrix.org');

const mockData = require('./data');
const client = {
  publicRooms: (f) => {
    f(null, mockData);
  }
};

const init = () => {
  // Here we can access the DOM.
  const $chatRooms = document.querySelector('#chat-rooms');
  const showRoom = (room) => {
    const $li = mkLi(room.name);
    $chatRooms.appendChild($li);
  };
  client.publicRooms((_, data) => {
    data.chunk.forEach(showRoom);
  });
};

const mkLi = (message) => {
  const $li = document.createElement('li');
  $li.innerText = message;
  return $li;
};

document.addEventListener('DOMContentLoaded', init);
