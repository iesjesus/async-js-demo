// API URL
const API_URL = 'https://randomuser.me/api/?results=5';

// 1. Using Callbacks
function fetchUsersCallback(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => {
        if (xhr.status === 200) {
            callback(null, JSON.parse(xhr.responseText));
        } else {
            callback(`Error: ${xhr.status}`);
        }
    };
    xhr.onerror = () => callback('Network Error');
    xhr.send();
}

// 2. Using Promises
function fetchUsersPromise(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject(`Error: ${xhr.status}`);
            }
        };
        xhr.onerror = () => reject('Network Error');
        xhr.send();
    });
}

// 3. Using Async/Await
async function fetchUsersAsync(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch Error:', error);
        throw error;
    }
}

// Utility: Render Users in the DOM
function renderUsers(users) {
    const userList = document.getElementById('user-list');
    userList.innerHTML = ''; // Clear the list
    users.forEach(user => {
        const listItem = document.createElement('li');
        listItem.textContent = `${user.name.first} ${user.name.last} (${user.email})`;
        userList.appendChild(listItem);
    });
}

// Workflow Examples
// 1. Callbacks
fetchUsersCallback(API_URL, (error, data) => {
    if (error) {
        console.error('Callback Error:', error);
    } else {
        console.log('Callback Data:', data.results);
        renderUsers(data.results);
    }
});

// 2. Promises
fetchUsersPromise(API_URL)
    .then(data => {
        console.log('Promise Data:', data.results);
        renderUsers(data.results);
    })
    .catch(error => console.error('Promise Error:', error));

// 3. Async/Await
(async () => {
    try {
        const data = await fetchUsersAsync(API_URL);
        console.log('Async/Await Data:', data.results);
        renderUsers(data.results);
    } catch (error) {
        console.error('Async/Await Error:', error);
    }
})();
