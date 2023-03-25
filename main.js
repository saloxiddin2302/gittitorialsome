var elBurger = document.querySelector(".header__btn");
var elClose = document.querySelector(".header__btn-close");
var elHeader = document.querySelector(".header");




"use strict";

// {
//     "title": "Patton Oswalt: Annihilation",
//     "year": 2017,
//     "categories": ["Uncategorized"],
//     "imdbId": "tt7026230",
//     "imdbRating": 7.4,
//     "runtime": 66,
//     "language": "English",
//     "youtubeId": "4hZi5QaMBFc",
//     "summary": "Patton Oswald, despite a personal tragedy, produces his best standup yet. Focusing on the tribulations of the Trump era and life after the loss of a loved one, Patton Oswald continues his journey to contribute joy to the world.",
//     "smallThumbnail": "http://i3.ytimg.com/vi/4hZi5QaMBFc/hqdefault.jpg",
//     "bigThumbnail": "http://i3.ytimg.com/vi/4hZi5QaMBFc/maxresdefault.jpg"
// }

movies.splice(50);



// ============================= NORMALIZE ALL MOVIES =========================//

let allMovies = movies.map((item) => {
    return {
        id: item.imdbId,
        year: item.year,
        category: item.categories,
        rating: item.imdbRating,
        lang: item.language,
        link: `https://youtube.com/embed/${item.youtubeId}`,
        title: item.title,
        summary: item.summary,
        maxImg: item.bigThumbanil,
        minImg: item.smallThumbnail,
        time: `${Math.trunc(item.runtime/60)}h ${item.runtime%60}m`
    };
});

// console.log(allMovies);


// ============================= NORMALIZE ALL MOVIES END =========================//
// renderUi()

function renderMovies (movies){
    $('.wrapper').innerHTML = "";


 if (movies && movies.length) {
    movies.forEach(item => {
        const card = createElement('div', 'card', `
           <div class="bg-image hover-overlay ripple"data-mdb-ripple-color="light">
            <img src="${item.minImg}"
                       class="img-fluid w-100" />
                       <div class="d-flex align-item-center mb-1" >
                       <p class=" ms-2">${item.title}</p>
                     </div>
                     <div class="d-flex align-item-center mb-1" >
                     <p class=" ms-2"><strong>Cotegory:</strong>${item.category}</p>
                   </div>
                       <div class="d-flex align-item-center mb-1" >
                       <span class=" ms-2"><strong>Year:</strong>${item.year}</span>
                     </div>
                     
                     <div class="d-flex align-item-center mb-3" >
                       <span class=" ms-2"><strong>Rating:</strong>${item.rating}</span>
                     </div>
                     <div class="d-flex align-item-center mb-3" >
                     <span class=" ms-2"><strong>Language:</strong> ${item.lang}</span>
                   </div>
                     <div class="d-flex justife-content-between flex-colum flex-xl-row">
                       <a class="btn btn-primary p-2 " href="${item.link}" target="_blank">Watch trailer</a>
                       <a class="btn btn-secondary p-2  " href="#">More info</a>
                       <button type="button" class="btn btn-success  p-2 btn-bookmark" data-info=${item.id}>Bookmark</button>
                     </div>
                     </div>

        `);
        $(".wrapper").append(card);
    });
    
 }else{
    $('.wrapper').innerHTML = "<h1 class = 'text-center text-danger'> NOT FOUND </h1>";
 }
}

renderMovies(allMovies)


function dynamicCatrgory(data){
    const cotygories = [];
    if (data) {
        data.forEach((item)=>{
          item.category.forEach(el =>{
            if(!cotygories.includes(el))
            cotygories.push(el)
          })
        })
    }


    if(cotygories.length){
        cotygories.forEach((item) =>{
            const option = createElement('option' , 'item' , item);
            $('#category').append(option);
        })
    }
}

dynamicCatrgory(allMovies);





$('#global-search').addEventListener('keyup' , (evt) =>{
     $(".wrapper").innerHTML = ""

    const result =  allMovies.filter((item) => {
        return item.title.toLowerCase().includes(evt.target.value.toLowerCase());
    })
    if(result.length){
        renderMovies(result)
    }else{
        $('.wrapper').innerHTML = "<h1 class = 'text-center text-warning'> NOT FOUND </h1>";
    }
})

const findFilms = (filmtitle , rating , category )=>{
    return allMovies.filter((item) =>{
        return item.title.includes(filmtitle) && item.rating >= rating && item.category.includes(category)
    })
}

function search(){
    let byTiltle = $('#name').value
    let byRating =  $('#rating').value;
    let byCategory = $('#category').value;

    console.log(byTiltle , byRating , byCategory);

    const result = findFilms(byTiltle , byRating , byCategory)

    if(result && result.length){
        renderMovies(result)
    }else{
        $('.wrapper').innerHTML = "<h1 class = 'text-center text-warning'> NOT FOUND </h1>";
    }


}
$('#searchFilm').addEventListener("submit", () =>{
    search()
   

})
let bookmark = [];

$(".wrapper").addEventListener("click" , (evt) =>{
    $('.bookmark').innerHTML="";
    if(evt.target.classList.contains("btn-bookmark")){
        let id = evt.target.getAttribute("data-info");

        const select = allMovies.filter((el) => el.id == id)[0];

        if (!bookmark.includes(select)){
            bookmark.push(select);
        }

        // console.log(bookmark);
        getBookmark(bookmark)
    
    }
})

function getBookmark (data){
    if (data.length) {
        data.forEach((item , index) =>{
            const bookCard = createElement('div' , 'card' , `
            <div class="row g-0">
               <div class="col-md-4">
                <img src="${item.minImg}" alt="" class="img-fluid rounded-start">
               </div>
               <div class="col-md-8">
                <div class="card-body">
                  <h6 class="">
                    ${item.title}
                  </h6>
                  <span data-item= "${index}" class="bg-danger p-3 rounded-circle cursor-pointer del">x</span>
            </div>
          </div>
            `);
            $('.bookmark').append(bookCard)
        })
    }
}
// getBookmark(bookmark)

$('.bookmark').addEventListener("click" ,(evt) => {
     $('.bookmark').innerHTML = ""
      if (evt.target.classList.contains('del')) {
        let id = evt.target.getAttribute('data-item')
       
        let filterBookmark = bookmark.splice(id,1 )
        // console.log(filterBookmark);
        getBookmark(bookmark)
    }
})




