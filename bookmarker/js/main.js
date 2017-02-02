//listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

//Save Bookmark
function saveBookmark(e) {
    //Get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;
   if (!validateForm(siteName,siteUrl)) {
   		return false;
   }

    var bookmark = {
            name: siteName,
            url: siteUrl
        }
        //Local Storage 
        /*localStorage.setItem('test','Hello World');
        console.log(localStorage.getItem('test'));
        localStorage.removeItem('test');
        console.log(localStorage.getItem('test'));*/

       document.getElementById('myForm').reset();
    //Test if bookmarks is null
    if (localStorage.getItem('bookmarks') === null) {
        //Init array
        var bookmarks = [];
        //Add to array
        bookmarks.push(bookmark);
        //Set to LocalStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        //Get bookmarks from localStorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        //Add bookmark to array
        bookmarks.push(bookmark);
        //Re-set back to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }


    //Re-fetch bookmarks
    fetchBookmarks();
    //Prevent Form from submiting
    e.preventDefault();
}

//deleteBoomark
function deleteBoomark(url) {
    //Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //Loop through bookmarks
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            //remove from array
            bookmarks.splice(i, 1);
        }
    }
    //Re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    //Re-fetch bookmarks
    fetchBookmarks();
}

function fetchBookmarks() {
    //Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //Get output id
    var bookmarksResults = document.getElementById('bookmarksResults');

    //Build output
    bookmarksResults.innerHTML = '';
    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        bookmarksResults.innerHTML += '<div class="well">' +
            '<h3>' + name +
            '<a class="btn btn-default" target="_blank" href="' + url + '">Visite</a>' +
            '<a onclick="deleteBoomark(\'' + url + '\')" class="btn btn-danger" href="#">Delete</a>' +
            '<h3>' +
            '</div>';
    }
}

function validateForm(siteName,siteUrl) {
    if (!siteName || !siteUrl) {
        alert('Please fill in the form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (!siteUrl.match(regex)) {
        alert('Please use valid url');
        return false;
    }
    return true;
}
