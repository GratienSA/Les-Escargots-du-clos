let card = document.querySelector('.allArticle');

// Fonction qui affiche les articles disponibles uniquement
async function getAllArticles() {
    try {
        let apiCall = await fetch('http://localhost:3300/article/Article');
        let response = await apiCall.json();
        response.forEach(article => {
            if (article.quantity > 0) {
                card.innerHTML += `
                <div class="product-card bg-white rounded-lg overflow-hidden shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                    <img src="http://localhost:3300/${article.link}" alt="Produit" class="w-full h-64 object-cover transition duration-300 ease-in-out transform hover:scale-105">
                    <div class="p-6">
                        <h3 class="text-xl font-semibold mb-2">${article.title}</h3>
                        <p>${article.category}</p>
                        <p class="text-gray-700 mb-2">${article.description}</p>
                        <p class="text-gray-700 font-semibold">Prix: ${article.prix}€</p>
                        <div class="flex items-center mt-4">
                            <span class="mr-2 text-gray-600">Stock disponible :</span>
                            <span class="text-green-600 font-semibold" id="stock-${article.id}">${article.quantity}</span>
                        </div>
                        <form class="mt-4" action="#" onsubmit="event.preventDefault(); AddArticle('${article.id}', ${article.quantity});">
                            <div class="flex items-center">
                                <button type="button" class="bg-gray-300 text-gray-700 px-3 py-1 rounded-l-md" onclick="decrementQuantity('${article.id}')">-</button>
                                <input id="quantity-${article.id}" type="text" class="w-16 text-center border border-gray-300 rounded-none" value="1" readonly>
                                <button type="button" class="bg-gray-300 text-gray-700 px-3 py-1 rounded-r-md" onclick="incrementQuantity('${article.id}', ${article.quantity})">+</button>
                            </div>
                            <button type="submit" class="mt-4 bg-green-900 text-white py-2 px-4 rounded-lg hover:bg-green-700">Ajouter au panier</button>
                        </form>
                    </div>
                </div>`;
            }
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des articles:', error);
    }
}

function incrementQuantity(articleId, maxQuantity) {
    let quantityInput = document.getElementById(`quantity-${articleId}`);
    let currentQuantity = parseInt(quantityInput.value);
    if (currentQuantity < maxQuantity) {
        quantityInput.value = currentQuantity + 1;
    }
}

function decrementQuantity(articleId) {
    let quantityInput = document.getElementById(`quantity-${articleId}`);
    let currentQuantity = parseInt(quantityInput.value);
    if (currentQuantity > 1) {
        quantityInput.value = currentQuantity - 1;
    }
}

async function AddArticle(articleId, maxQuantity) {
    let quantityInput = document.getElementById(`quantity-${articleId}`);
    let quantityToAdd = parseInt(quantityInput.value);
    let stockSpan = document.getElementById(`stock-${articleId}`);
    let newStock = maxQuantity - quantityToAdd;

    // Mise à jour du stock disponible sur le frontend
    stockSpan.textContent = newStock;

    // Mise à jour du stock disponible sur le backend
    try {
        await fetch(`http://localhost:3300/article/UpdateArticle/${articleId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ quantity: newStock }),
        });

        // Ajouter les articles au localStorage pour les utiliser dans panier.html
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push({ id: articleId, quantity: quantityToAdd, price: document.querySelector(`#price-${articleId}`).textContent });
        localStorage.setItem('cart', JSON.stringify(cart));

        // Redirection vers panier.html après l'ajout au panier
        window.location.href = 'panier.html';
    } catch (error) {
        console.error('Erreur lors de la mise à jour du stock:', error);
    }
}

getAllArticles();




// ajouter un article a une location lier au client
async function AddArticle(id){
    const modale=document.querySelector('.modale')
    
    let request = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=utf-8',
          Authorization: `Bearer ${jwt}`,
      },
    }
    let apiCall = await fetch(`http://localhost:3444/addLocation/${id}`, request)
    let response = await apiCall.json()
    let requestLoc = {
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=utf-8',
          Authorization: `Bearer ${jwt}`,
      },
    }
    let Location = await fetch(`http://localhost:3444/afficherLocation`, requestLoc)
    let Locresponse = await Location.json()
    
    Locresponse.forEach(loc => {
        if(loc.status ==="a valider"){
      modale.innerHTML+=`<div class="text-center bg-gray-100 m-2"><p>${loc.title}</p><p>${loc.category}</p>
      <p>${loc.prix}€</p></div>
      <button class="bg-green-500 m-2 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onclick="valider('${loc.id}')">Valider</button>
      <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onclick="deleteLoc(${loc.id})">Supprimer</button>`
    }  
    });
    alert('ajouter au panier')
}


async function panier(){
    const modale=document.querySelector('.modale')
    const article=document.querySelector('.article')
    article.classList.toggle('hidden')
    modale.classList.toggle('hidden')
}
async function valider(id){
    localStorage.setItem('article',id)
        window.location.href="./valider/valider.html"
 }
 async function deleteLoc(id){
    let request1 = {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json; charset=utf-8',
          Authorization: `Bearer ${jwt}`,
      },
    }
    let deleteLocation = await fetch(`http://localhost:3444/supprLoc/${id}`, request1)
    let responsedelete = await deleteLocation.json()
    
     window.location.reload() 
}
async function Consoles() {
    let apiCall = await fetch('http://localhost:3444/Article')
    let response = await apiCall.json()
    card.innerHTML=""
    response.forEach(article => {
        if(article.category==="console"){
            if(article.quantity===0){

            }else{
            card.innerHTML +=`<div class="bg-gray-200 rounded text-center m-3 shadow-md p-2 md:w-1/5">
            
            <p class="font-bold">${article.title}</p>
            <img src="http://localhost:3444/${article.link}">
            <p>${article.description}</p>
            <p>${article.category} </p>
            <div class="flex flex-row justify-between">
            <p> disponible : ${article.quantity}</p>
            <p>${article.prix}€</p>
            </div>
            <button class="bg-green-500 m-2 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onclick="AddArticle('${article.id}')">Louer<button>
            <div>`
            }
        }
    })
}
async function Accessoire() {
    let apiCall = await fetch('http://localhost:3444/Article')
    let response = await apiCall.json()
    card.innerHTML=""
    response.forEach(article => {
        if(article.category==="Accessoires"){
            if(article.quantity===0){

            }else{
            card.innerHTML +=`<div class="bg-gray-200 rounded text-center m-3 shadow-md p-2 md:w-1/5">
            
            <p class="font-bold">${article.title}</p>
            <img src="http://localhost:3444/${article.link}">
            <p>${article.description}</p>
            <p>${article.category} </p>
            <div class="flex flex-row justify-between">
            <p> disponible : ${article.quantity}</p>
            <p>${article.prix}€</p>
            </div>
            <button class="bg-green-500 m-2 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onclick="AddArticle('${article.id}')">Louer<button>
            <div>`
            }
        }
    })
}
async function JeuxVideo() {
    let apiCall = await fetch('http://localhost:3444/Article')
    let response = await apiCall.json()
    card.innerHTML=""
    response.forEach(article => {
        if(article.category==="jeux_video"){
            if(article.quantity===0){

            }else{
            card.innerHTML +=`<div class="bg-gray-200 rounded text-center m-3 shadow-md p-2 md:w-1/5">
            
            <p class="font-bold">${article.title}</p>
            <img src="http://localhost:3444/${article.link}">
            <p>${article.description}</p>
            <p>${article.category} </p>
            <div class="flex flex-row justify-between">
            <p> disponible : ${article.quantity}</p>
            <p>${article.prix}€</p>
            </div>
            <button class="bg-green-500 m-2 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onclick="AddArticle('${article.id}')">Louer<button>
            <div>`
            }
        }
    })
}
async function logOut(){
    localStorage.clear()
    window.location.href="../Acceuil/acceuil.html"
}