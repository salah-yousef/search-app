(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');// thi

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        searchedForText = document.getElementById('search-keyword').value;

        const articleRequest = new XMLHttpRequest();
        articleRequest.onload = addArticles;
        articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=742f63e717a9401ebc334310cdf5c37d`);
        articleRequest.send();

        const unsplashRequest = new XMLHttpRequest();
        unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
        unsplashRequest.onload = addImage;
        unsplashRequest.setRequestHeader('Authorization', 'Client-ID dcfe3a0e0b3631911d31eb1c88ebac9cf292bd1b2e9140bfc46da8bbff997f2a');
        unsplashRequest.send();

        function addImage() {
            let htmlContent = document.createElement('div');
            const data = JSON.parse(this.responseText);
            console.log(this.responseText)
            const firstImage = data.results[0];

            if (data && data.results && data.results[0]) {
                htmlContent.innerHTML = `<figure>
                <img src="${firstImage.urls.regular}" alt="${searchedForText}">
                <figcaption> ${searchedForText} by ${firstImage.user.name} </figcaption>
                </figure>`;
            } else {
                htmlContent.innerHTML = '<div class="error-no-image"> No images available </div>';
            }
            responseContainer.insertAdjacentElement('afterbegin', htmlContent);
        }

        function addArticles() {
            let htmlContent = document.createElement('div');
            console.log(this.responseText)
            const data = JSON.parse(this.responseText);
            if (data.response && data.response.docs && data.response.docs.length > 1) {
                htmlContent.innerHTML = '<ul>' + data.response.docs.map(article => `<li class="article"> <h2> <a href="${article.web_url}"> ${article.headline.main} </a> </h2>
                <p>${article.snippet}</p>
                </li>`
                ).join('') + '</ul>';
            } else {
                htmlContent.innerHTML = '<div class="error-no-articles"> No articles available </div>';
            }
            responseContainer.insertAdjacentElement('beforeend', htmlContent);

        }


    });

})();
