const bcrypt = require('bcrypt');

const password = 'secret';
let dbPassword;
const saltRounds = 10;


bcrypt
  .hash(password, saltRounds)
  .then(hashedPassword => {
    console.log(`Hashed Password: ${hashedPassword}`);
    return hashedPassword;
  })
  .then(hashedPassword => {
    return bcrypt.compare(password, hashedPassword)
  })
  .then(res => {
    console.log('match', res);
  })
