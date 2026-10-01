function filterBy(tag) {
    const wasSelected = tag.getAttribute('selected') === 'true';

    document.querySelectorAll('.bookshelf-filters button').forEach(el => {
        el.removeAttribute('selected');
        el.setAttribute('aria-pressed', 'false');
    });

    const books = document.querySelectorAll('.book-item');

    if (wasSelected) {
        books.forEach(book => {
            book.style.display = '';
        });
        return;
    }

    tag.setAttribute('selected', 'true');
    tag.setAttribute('aria-pressed', 'true');

    const selectedTag = tag.getAttribute('data-tag');
    books.forEach(book => {
        book.style.display = book.dataset.tags.includes(selectedTag) ? '' : 'none';
    });
}
