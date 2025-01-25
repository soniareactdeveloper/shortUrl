// Function to generate a random short ID
function generateRandomShortId(characters) {
  let shortId = '';

  // Generate a 5-character random short ID
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    shortId += characters[randomIndex];
  }

  return shortId;
}


module.exports = generateRandomShortId;