const API_URL = "https://randomuser.me/api/?results=7";
let search = document.querySelector('#name');
let result = document.querySelector('#result');
let listItem = [];

getData();

search.addEventListener('input', e => filterItems(e.target.value));

async function getData(){
    const res = await fetch(API_URL);
    const data = await res.json();

    getUsersDetails(data)
}

function getUsersDetails(data){
    for(let i = 0; i < data.results.length; i++){
        let name = data.results[i].name.first;
        let surname = data.results[i].name.last;
        let city = data.results[i].location.city;
        let country = data.results[i].location.country;
        let image = data.results[i].picture.large;

        let li = document.createElement('li');
        listItem.push(li)
        
        addUsersDOM(name, surname, city, country, image, li);
    }
}

function addUsersDOM(name, surname, city, country, image, li){
    li.innerHTML += `
        <img src = "${image}" id = "image">
        <div class = "user-info">
            <h4 id = "name">${name} ${surname}</h4>
            <p id = "location">${city}, ${country}</p>
        </div>
    `
    result.appendChild(li)
}


function filterItems(searchValue){
    listItem.forEach(item => {
        if(item.innerText.toLowerCase().includes(searchValue.toLowerCase())){
            item.classList.remove('hide')
        } else{
            item.classList.add('hide')
        }
    })
}