// Fetch & Load All Posts On HTML.
const loadPosts = async (categoryName = "") => {

    // Alternative Way.
    // if (categoryName)
    //     url = `https://openapi.programming-hero.com/api/retro-forum/posts?category=${categoryName}`;
    // else
    //     url = "https://openapi.programming-hero.com/api/retro-forum/posts";

    const url = `https://openapi.programming-hero.com/api/retro-forum/posts?category=${categoryName}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    displayPosts(data.posts);

}

const displayPosts = (posts) => {
    console.log(posts);
    const postContainer = document.getElementById('post-container');

    posts.forEach = (post => {
        const div = document.createElement('div');

        div.innerHTML = `
         <div class="w-full lg:w-[772px] space-y-5 bg-[#797dfc]/10 p-10 rounded-3xl flex flex-col  md:flex-row gap-6">

                <div class="indicator">
                    <span class="indicator-item badge badge-secondary"></span>
                    <div class="bg-base-300 grid h-32 w-32 place-items-center">
                        <img src="" alt="" class="">
                    </div>
                </div>

                <div class="">

                    <div class="flex gap-4 mb-3">
                        <p class="text-[#12132d]/80 text-sm font-medium">#Comedy</p>
                        <p class="text-[#12132d]/80 text-sm font-medium">Author : Awlad Hossain</p>
                    </div>

                    <h3 class="text-[#12132d] text-xl font-bold mb-4">10 Kids Unaware of Their Halloween Costume</h3>

                    <p class="text-[#12132d]/60 text-base mb-5">It’s one thing to subject yourself to ha Halloween
                        costume mishap because, hey that’s your prerogative</p>

                    <div class="border border-[#12132d]/2 border-dashed mb-5"></div>

                    <div class="">
                        <div class="flex flex-col md:flex-row md:justify-between mt-4 md:items-center">
                            <div class="flex flex-col md:flex-row gap-3 md:gap-6">
                                <p class=" text-gray-400  mb-3"><i class="fa-regular fa-comment-dots text-base"></i>
                                    Comment : <span class="text-base font-semibold"> c </span> </p>
                                <p class=" text-gray-400  mb-3"><i class="fa-regular fa-eye text-base"></i>
                                    View : <span class="text-base font-semibold"> v </span> </p>
                                <p class=" text-gray-400  mb-3"><i class="fa-regular fa-clock text-base"></i>
                                    Post : <span class="text-base font-semibold"> p </span> </p>
                            </div>

                            <button class="btn btn-circle"><i
                                    class="fa-solid fa-envelope-open bg-green-600 p-3 rounded-full text-white cursor-pointer"></i></button>
                        </div>
                    </div>

                </div>

            </div>
        `

        postContainer.append(div);
    });
}

const handleSearchByCategory = () => {
    const searchText = document.getElementById('searchPosts').value;
    console.log(searchText);
    loadPosts(searchText);
}

loadPosts();

// cardDemo()
// {
//     "id": 101,
//     "category": "Comedy",
//     "image": "https://i.ibb.co/0QRxkd5/pexels-jan-kop-iva-3525908.jpg",
//     "isActive": true,
//     "title": "10 Kids Unaware of Their Costume",
//     "author": {
//         "name": "John Doe"
//     },
//     "description": "It is one thing to subject yourself to a costume mishap",
//     "comment_count": 560,
//     "view_count": 1568,
//     "posted_time": 5
// }