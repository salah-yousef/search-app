/* eslint-env jquery */

(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;     
        $.ajax({
            url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
            headers: {
                Authorization: 'Client-ID dcfe3a0e0b3631911d31eb1c88ebac9cf292bd1b2e9140bfc46da8bbff997f2a'
            }
        }).done(addImage)
            .fail(function (err) {
                console.log(err);
            });
        function addImage(images) {
            let htmlContent = document.createElement('div');
            const firstImage = images.results[0];

            if (images && images.results && images.results[0]) {
                htmlContent.innerHTML = `<figure>
                <img src="${firstImage.urls.small}" alt="${searchedForText}">
                <figcaption> ${searchedForText} by ${firstImage.user.name} </figcaption>
                </figure>`;
            } else {
                htmlContent.innerHTML = '<div class="error-no-image"> No images available </div>';
            }
            responseContainer.insertAdjacentElement('afterbegin', htmlContent);
        }

        $.ajax({
            url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=742f63e717a9401ebc334310cdf5c37d`,

        }).done(addArticles)
            .fail(function (err) {
                console.log(err);
            });
        function addArticles(articles) {
            let htmlContent = document.createElement('div');
            if (articles.response && articles.response.docs && articles.response.docs.length > 1) {
                htmlContent.innerHTML = '<ul>' + articles.response.docs.map(article => `<li class="article"> <h2> <a href="${article.web_url}"> ${article.headline.main} </a> </h2>
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
