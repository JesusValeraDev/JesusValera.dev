function filterBy(tag) {
    let wasSelected = false;
    if (tag.getAttribute('selected') === 'true') {
        wasSelected = true;
    }

    document.querySelectorAll('.bookshelf-filters button').forEach(el => {
        el.removeAttribute('selected');
    })

    if (wasSelected === false) {
        tag.setAttribute('selected', true);

        let selectedTag = tag.getAttribute('data-tag')
        let books = document.querySelectorAll('.book-item');
        books.forEach(book => {
            let tags = book.dataset.tags;
            let showBook = tags.includes(selectedTag);

            if (showBook === false) {
                book.style.display = 'none';
            } else {
                book.style.display = '';
            }
        })
    } else {
        let books = document.querySelectorAll('.book-item');
        books.forEach(book => {
            book.style.display = '';
        });
    }
}
