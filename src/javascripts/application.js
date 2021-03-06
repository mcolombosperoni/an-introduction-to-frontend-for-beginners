
import Mustache from 'mustache';


/**
 * Manage Cookie Policy
 */

const cookiePolicy = document.querySelector('.cookie-policy');
cookiePolicy.querySelector('a').addEventListener('click', function(event) {
    event.preventDefault();
    cookiePolicy.classList.add('hidden');
})


/**
 * Load Articles
 */

const articleContainer = document.querySelector('.articles');
const source = document.getElementById('template-article').innerHTML;

fetch('https://my-json-server.typicode.com/marcomontalbano/an-introduction-to-frontend/articles')
    .then(function (response) { return response.json() })
    .then(function (articles) {
        console.log(articles)
        const articlesAsHtml = articles.map(function (article) {
            return Mustache.render(source, article);
        });

        articleContainer.innerHTML = articlesAsHtml.join('');
    });


/**
 * Handle Articles Like
 */

articleContainer.addEventListener('click', function(event) {
    const likeButton = event.target;
    if (likeButton.matches('.article--like')) {
        event.preventDefault();
        const articleElement = likeButton.closest('.article');
        const articleId = articleElement.getAttribute('data-article-id');
        
        fetch('https://my-json-server.typicode.com/marcomontalbano/an-introduction-to-frontend/articles/' + articleId, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                like: !likeButton.classList.contains('liked')
            })
        })
            .then(function(response) { return response.json(); })
            .then(function(json) {
                console.log(json);
                likeButton.classList.toggle('liked', json.like);
            });
    }
})
