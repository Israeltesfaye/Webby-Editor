// Initialize the counter
  let counter = 0;

  // Select elements
  const counterElement = document.querySelector('.counter');
  const messageElement = document.querySelector('.message');
  const incrementButton = document.querySelector('.increment-button');
  const decrementButton = document.querySelector('.decrement-button');

  // Function to update the counter and message
  const updateMessage = () => {
    counterElement.textContent = counter;
    if (counter > 0) {
      messageElement.textContent = `😊 You're doing great! Keep going!`;
    } else if (counter < 0) {
      messageElement.textContent = `😅 Oops! Let's get back to positive!`;
    } else {
      messageElement.textContent = `👋 Welcome! Let's have some fun!`;
    }
  };

  // Increment counter
  incrementButton.addEventListener('click', () => {
    counter++;
    updateMessage();
  });

  // Decrement counter
  decrementButton.addEventListener('click', () => {
    counter--;
    updateMessage();
  });