//const getUser = username => {
  //const API_URL = 'https://api.github.com/users/${username}';
  //return fetch(API_URL).then(value => value.json());

//}

//getUser('openai').then(value => console.log(value));

//const getUser = async username => {
    //const API_URL = `https://api.github.com/users/${username}`;
    //const response = await fetch(API_URL);
   // const data = await response.json(); // Await the resolution of the Promise
   // return data;
 // };
  
 // getUser('openai').then(value => console.log(value));
  
  
 const getGithubUser = username => {
  return new Promise((resolve, reject) => {  // Removed 'executor:'
    fetch(`https://api.github.com/users/${username}`) // Removed 'input:'
      .then(response => response.json()) // Corrected chained .then() syntax
      .then(data => {
        if (data.message === "Not Found") {
          reject('User not found');     // Simplified reject argument
        } else {
          resolve(data);
        }
      })
      .catch(err => reject(err));
  });
};

getGithubUser( username = "sonalshrimali").then(value => console.log(value)).catch(err => console.log('error',err));