//Тази функция се ползва за тракинг на viewport-а, и според него се маркира
//като активна иконата в сайдбара
window.onload = function () {
    scrollSpy('#tabSwitch', {
        sectionSelector: '.videoSection',
        targetSelector: '.block',
        activeClass: 'text-white',
        offset: 100
    });
}

// Тази функция се ползва за скриване на сайдбара(header-a) на мобилна
// когато се скролва надолу
// const browserWidth = Math.max(
//     document.body.scrollWidth,
//     document.documentElement.scrollWidth,
//     document.body.offsetWidth,
//     document.documentElement.offsetWidth,
//     document.documentElement.clientWidth
//   );

// let prevScrollpos = window.pageYOffset;
// const videoSections = document.querySelectorAll(".videoSection");

// if (browserWidth <= 640){
//   window.onscroll = function() {
//     let currentScrollPos = window.pageYOffset;
//       if (prevScrollpos < currentScrollPos) {
//         videoSections.forEach(element => {
//           element.classList.remove('scroll-mt-20');
//         });
//         document.getElementById("sidebar").classList.add('-top-24');
//       } else {
//         videoSections.forEach(element => {
//           element.classList.add('scroll-mt-20');
//         });
//         document.getElementById("sidebar").classList.remove('-top-24');
        
//       }
//       prevScrollpos = currentScrollPos;
//     }
// }



// Тази функция взема резултатите от data.json и пълни видео редовете
const trendingRow = document.querySelector('#Trending .videoRow');
const movieRow = document.querySelector('#Movies .videoRow');
const tvRow = document.querySelector('#TvSeries .videoRow');
const bookmarskRow = document.querySelector('#Bookmarks .videoRow')


fetch('./data.json')
   .then(response => response.json())
   .then(json => {
      json.objects.sort(function(a, b){
        return Number(b.release_date.slice(0, 4)) - Number(a.release_date.slice(0, 4));
      });
      
        movieRow.innerHTML = "";
        tvRow.innerHTML = "";
        json.objects.map((media) => {
          const ordinaryVideo = `<div data-id="${media.id}" class="video cursor-pointer group">
                                    <div class="imgBox relative rounded-lg overflow-hidden">
                                        <img src="${media.cover_photo}" alt="${media.title}" class="group-hover:scale-105 transition-all duration-700 object-cover aspect-video w-full h-full max-h-64" loading="lazy" width="565" height="317">
                                        <div class="bookmark absolute top-2 right-2 rounded-full bg-black/50 w-10 h-10 flex items-center justify-center z-20"><i class="fa-regular fa-bookmark text-base text-white"></i></div>
                                        <div class="cover absolute top-0 left-0 w-full h-full bg-black/50 opacity-0 group-hover:opacity-100 transition-[opacity] duration-700"></div>
                                    </div>
                                    <div class="description flex items-center justify-start gap-2 text-base text-slate-400 mt-1">
                                        <span>${media.release_date.slice(0, 4)}</span>
                                        ·
                                        <span class="flex items-center gap-1"><i class="fa-solid fa-${media.type === 'Movie' ? 'film' : 'tv'}"></i> ${media.type}</span>
                                        ·
                                        <span>${media.age_restriction}</span>
                                    </div>
                                    <h3 class="title text-xl text-white">
                                        ${media.title}
                                    </h3>
                                </div>`;
                              
          switch (media.type) {
            case 'Movie':
              movieRow.innerHTML += ordinaryVideo;
              break;
            case 'TV Series':
              tvRow.innerHTML += ordinaryVideo;
              break;
            default:
              break;
          }
        
        })
      
         //Тази функция пълни Trending видеата по random 
        const trendingAmount = 3;
        const currentTrendingIds = [];
          
        for (let i = 0; i < trendingAmount;) {
      
          const randomTrending = json.objects[Math.floor(Math.random() * json.objects.length)]
      
          if(randomTrending.trending && !currentTrendingIds.includes(randomTrending.id)){
            currentTrendingIds.push(randomTrending.id);
            trendingRow.innerHTML += `<div data-id="${randomTrending.id}" class="video relative rounded-lg overflow-hidden cursor-pointer group max-h-72">
                                        <img src="${randomTrending.cover_photo}" alt="${randomTrending.title}" class="group-hover:scale-105 transition-all duration-700 object-cover object-center aspect-video w-full h-full" width="565" height="317">
                                        <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/50"></div>
                                        <div class="cover absolute top-0 left-0 w-full h-full bg-black/50 opacity-0 group-hover:opacity-100 transition-[opacity] duration-700"></div>
                                        <div class="bookmark absolute top-2 right-2 rounded-full bg-black/50 w-10 h-10 flex items-center justify-center"><i class="fa-regular fa-bookmark text-base text-white"></i></div>
                                        <div class="absolute bottom-4 left-4">
                                          <div class="description flex items-center justify-start gap-2 text-base text-white/80 mt-1">
                                            <span>${randomTrending.release_date.slice(0, 4)}</span>
                                            ·
                                            <span class="flex items-center gap-1"><i class="fa-solid fa-${randomTrending.type === 'Movie' ? 'film' : 'tv'}"></i> ${randomTrending.type}</span>
                                            ·
                                            <span>${randomTrending.age_restriction}</span>
                                            </div>
                                            <h3 class="title text-xl text-white">
                                                ${randomTrending.title}
                                            </h3>
                                          </div>
                                        </div>
                                      </div>`;
                                      document.querySelectorAll('.TrendingSkeleton')[i].classList.add('hidden');
            i++;
          }
        }     
      })
      .then(
        function clientSideSearch(){
          const videos = document.querySelectorAll('.video');
          const searchBox = document.getElementById("SearchBox");
        
            function liveSearch() {
              searchBox.value;
                //Use innerText if all contents are visible
                //Use textContent for including hidden elements
                for (var i = 0; i < videos.length; i++) {
                    if(videos[i].textContent.toLowerCase()
                            .includes(searchBox.value.toLowerCase())) {
                            videos[i].classList.remove("hidden");
                    } else {
                      videos[i].classList.add("hidden");
                    }
                }
            }
          
            //A little delay
            let typingTimer;               
            let typeInterval = 200;  
      
            searchBox.addEventListener('input', () => {
              clearTimeout(typingTimer);
              typingTimer = setTimeout(liveSearch, typeInterval);
            });
        
            
        }
      );

   
window.addEventListener('load', () => {
  if (!bookmarskRow.hasChildNodes()) {
    bookmarskRow.innerHTML = `<p class="text-lg italic text-white/70">You don't have any bookmarks</p>`
  }
})