/*
const button_soft_key = document.getElementById('soft_key_t2t');
const button_send_message = document.getElementById('btn-message');
const input = document.getElementById('input-message');


const typeIntoInput = () => {
    input.value = 'Test input'; 
    input.dispatchEvent(new Event('input', { bubbles: true })); 
};

const clickButton = () => {
  button_soft_key.click();
  typeIntoInput(); 
  button_send_message.click();
};

const stressTest = async () => {
  for (let i = 0; i < 5000; i++) {
    clickButton();
    await sleep(20)

  }
};

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};


stressTest();*/

//manpulating DOM is a client side but we are using docker which is server side and we need to use helper packages to simulate maniuplating DOM inside screen container
const { JSDOM } = require('jsdom');

// Create a simulated DOM environment
const dom = new JSDOM(`
  <!DOCTYPE html>
  <html>
    <body>
      <button id="soft_key_t2t">Soft Key</button>
      <button id="btn-message">Send Message</button>
      <input id="input-message" type="text">
    </body>
  </html>
`);

const { window } = dom;

// Access DOM elements using the window object
const button_soft_key = window.document.getElementById('soft_key_t2t');
const button_send_message = window.document.getElementById('btn-message');
const input = window.document.getElementById('input-message');

const typeIntoInput = () => {
    input.value = 'Test input'; 
    input.dispatchEvent(new window.Event('input', { bubbles: true })); 
};

const clickButton = () => {
  button_soft_key.click();
  typeIntoInput(); 
  button_send_message.click();
};

const stressTest = async () => {
  for (let i = 0; i < 5000; i++) {
    clickButton();
    console.log("hello")
    await sleep(20);
  }
};

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

stressTest();


