(function() {
    const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NzJjNmIwYjlhYWQxMzEyYzlkYWY3MmZmZWYzYmM3MiIsInN1YiI6IjYxZmNlOGY3N2E5N2FiMDA0N2U2ZTMzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Skjv6dYxa7qjdxWSz1tJVMH151T2WMNp4pzuursIeYw'
    const url = `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=`;
    const posterPrefix = 'https://image.tmdb.org/t/p/w300/';
    const cardList = document.querySelector('.listing-card__list');

    let loading = false;
    let page = 10;

    function init() {
        let isScrolling = null;

        window.addEventListener('scroll', e => {
            if(isScrolling) { clearTimeout(isScrolling); }

            isScrolling = setTimeout(() => {
                const scrollTop = document.documentElement.scrollTop;
                const clientHeight = document.documentElement.clientHeight;
                const scrollHeight = document.documentElement.scrollHeight;

                const currentScrollHeight = scrollTop + clientHeight;
                if(scrollHeight - currentScrollHeight < 100 && !loading) {
                    getMovieData();
                }
            }, 500);
        }, false);
    }
    init();

    async function getMovieData() {
        loading = true;
        const res = await fetch(url + page++, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                accept: 'application/json'
            }
        });

        const data = await res.json();
        console.log(data);
        if(data.results.length > 0) {
            makeList(data.results);
        }
        loading = false;
    }
    getMovieData();

    function makeList(data) {
        data.forEach(function(item) {
            const li = makeItem(item);
            cardList.appendChild(li);
        })
    }

    function makeItem(item) {
        const li = document.createElement('li');
        const imgUrl = posterPrefix + item.poster_path;
        const cardName = item.original_title;
        const cardDate = item.release_date;
        // li.classList.add('listing-card__item');
        // li.classList.remove('listing-card__item');
        // li.classList.toggle('listing-card__item');
        li.className = 'listing-card__item';
        li.innerHTML = `
            <div class="listing-card__image" style="background-image:url('${imgUrl}')"></div>
            <div class="listing-card__info">
                <strong class="listing-card__name">${cardName}</strong>
                <p class="listing-card__date">${cardDate}</p>
            </div>
        `;

        return li;
    }
})();