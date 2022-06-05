import './sass/main.scss';
import { fetchImages } from './js/fetch-images';
import { renderGallery } from './js/render-gallery';
import { onScroll, onTotopBtn } from './js/scroll';

import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
    form: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.btn-load-more'),
};

let query = '';
let page = 1;
let simpleLightBox;
const perPage = 40;

refs.form.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

onScroll();
onTotopBtn();

function onSearch(event) {
    event.preventDefault();
    window.scrollTo({ top: 0 });
    page = 1;
    query = event.currentTarget.searchQuery.value.trim();
    refs.gallery.innerHTML = '';
    refs.loadMoreBtn.classList.add('is-hidden');

    if (query === '') {
        emptySearch();
        return;
    };

    fetchImages(query, page, perPage)
        .then(({ data }) => {
            if (data.totalHits === 0) {
                noFoundImages();
            } else {
                renderGallery(data.hits);
                simpleLightBox = new SimpleLightbox('.gallery a').refresh();
                okFoundImages(data);

                if (data.totalHits > perPage) {
                    refs.loadMoreBtn.classList.remove('is-hidden');
                }
            }
        }).catch(error => console.log(error))
        .finally(() => {
            refs.form.reset();
        });
};

function onLoadMore() {
    page += 1;
    simpleLightBox.destroy();

    fetchImages(query, page, perPage)
        .then(({ data }) => {
            renderGallery(data.hits);
            simpleLightBox = new SimpleLightbox('.gallery a').refresh();

            const totalPages = page * perPage;

            if (data.totalHits <= totalPages) {
                refs.loadMoreBtn.classList.add('is-hidden');
                endOfSearch();
            }
        }).catch(error => console.log(error));
};

function okFoundImages(data) {
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
};

function emptySearch() {
    Notiflix.Notify.failure('The search string cannot be empty!');
};

function noFoundImages() {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
};

function endOfSearch() {
    Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
};
