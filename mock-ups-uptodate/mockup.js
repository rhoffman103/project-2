$(document).ready(() => {
    let userNames = ['Bobby', 'Katie', 'Matt', 'Declan', 'Scott', 'Andrew'];
    const filters = {
        searchText: ''
    }
    const renderSearch = (usernames, filters) => {
        const filteredNames = usernames.filter(name => {
            return name.toLowerCase().includes(filters.searchText.toLowerCase())
        })
        $('#names').html('')

        filteredNames.forEach(name => {
            var p = $('<p>');
            $(p).addClass('username')
                .html(name)
                .appendTo($('#names'));
        })
    }
    $('#search-text').keydown(e => {
        filters.searchText = e.target.value
        renderSearch(userNames, filters);
    })
    $('html').on('click', e => {
        var element = e.target.className

        if (!element.includes("username")) {
            $('#names').empty();
        }
    })

    $('select').formSelect();
    $('.sidenav').sidenav();
    $('input#input_text, textarea#textarea2').characterCounter();
});