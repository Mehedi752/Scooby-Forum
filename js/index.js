
const loadPosts = async (categoryName = "") => {
    // Alternative Way.
    // if (categoryName)
    //     url = `https://openapi.programming-hero.com/api/retro-forum/posts?category=${categoryName}`;
    // else
    //     url = "https://openapi.programming-hero.com/api/retro-forum/posts";

    const url = `https://openapi.programming-hero.com/api/retro-forum/posts?category=${categoryName}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPosts(data.posts);

}

const displayPosts = (posts) => {

    const postContainer = document.getElementById('post-container');
    posts.forEach((post) => {
        const div = document.createElement('div');

        div.innerHTML = `
         <div class="w-full lg:w-[772px] space-y-5 bg-[#797dfc]/10 p-10 rounded-3xl flex flex-col md:flex-row gap-6">

                <div class="indicator mt-6">
                    <span class="indicator-item badge ${post.isActive ? "bg-green-600" : "bg-red-500"}"></span>
                    <div class="bg-base-300 grid h-32 w-32 place-items-center">
                        <img src="${post.image}" alt="" class="">
                    </div>
                </div>

                <div class="">

                    <div class="flex gap-4 mb-3">
                        <p class="text-[#12132d]/80 text-sm font-medium">#${post.category}</p>
                        <p class="text-[#12132d]/80 text-sm font-medium">Author : ${post.author.name}</p>
                    </div>

                    <h3 class="text-[#12132d] text-xl font-bold mb-4">${post.title}</h3>

                    <p class="text-[#12132d]/60 text-base mb-5">${post.description}</p>

                    <div class="border border-[#12132d]/2 border-dashed mb-5"></div>

                    <div class="">
                        <div class="flex justify-between flex-col md:flex-row gap-10  md:items-center mt-4">

                            <div class="flex flex-col md:flex-row gap-3 md:gap-6 md:items-center">
                                <p class=" text-gray-400"><i class="fa-regular fa-comment-dots text-base"></i>
                                    Comment : <span class="text-base font-semibold"> ${post.comment_count} </span> </p>
                                <p class=" text-gray-400"><i class="fa-regular fa-eye text-base"></i>
                                    View : <span class="text-base font-semibold"> ${post.view_count} </span> </p>
                                <p class=" text-gray-400"><i class="fa-regular fa-clock text-base"></i>
                                    Post : <span class="text-base font-semibold"> ${post.posted_time} </span> </p>
                            </div>

                            <div>
                                 <button onclick = "markAsRead('${post.description}','${post.view_count}')" class="btn btn-circle"><i
                                    class="fa-solid fa-envelope-open bg-green-600 p-3 rounded-full text-white cursor-pointer"></i></button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        `

        postContainer.appendChild(div);
    });
    document.getElementById('postLoader').classList.add('hidden');
}

const markAsRead = (description, viewCount) => {
    const markAsReadContainer = document.getElementById('markAsReadContainer');
    const div = document.createElement('div');

    div.innerHTML = `
    <div class="px-4 py-[15px] opacity-90 bg-white rounded-2xl flex gap-4 items-center">
        <h3 class="text-[#12132d] text-base font-bold">${description}</h3>
        <div class="flex gap-1">
            <p class=" text-gray-400"><i class="fa-regular fa-eye text-base"></i></p>
            <p>${viewCount}</p>
        </div>
    </div>
   `
    markAsReadContainer.appendChild(div);

    const markReadCount = document.getElementById('markAsReadCounter').innerText;
    let markReadCountNumber = parseFloat(markReadCount);
    markReadCountNumber++;
    document.getElementById('markAsReadCounter').innerText = markReadCountNumber;
}

const handleSearchByCategory = () => {
    const searchText = document.getElementById('searchPosts').value;
    console.log(searchText);

    document.getElementById('postLoader').classList.remove('hidden');
    const postContainer = document.getElementById('post-container');
    postContainer.innerHTML = "";
    setTimeout(function () {
        loadPosts(searchText);
    }, 3000)
}


const loadLatestPosts = async () => {
    const url = "https://openapi.programming-hero.com/api/retro-forum/latest-posts";
    const res = await fetch(url);
    const data = await res.json();
    displayLatestPosts(data);
}

const displayLatestPosts = (latestPosts) => {

    const latestPostContainer = document.getElementById('latest-post-container');
    latestPosts.forEach((post) => {

        const div = document.createElement('div');
        div.innerHTML = `
         <div class="card lg:w-96 pb-5 bg-base-100 shadow-2xl">

                    <figure class="lg:px-6 px-4 pt-4 lg:pt-8">
                        <img src=${post.cover_image} alt="Shoes" class="rounded-xl" />
                    </figure>
                    <div class="p-5 lg:p-10 space-y-4 lg:space-y-5">
                        <p class="opacity-50 text-start">
                            <i class="fa-solid fa-calendar-days me-2"></i>${post.author.posted_date ? post.author.posted_date : "No Publish Date"}
                        </p>
                        <h2 class="card-title text-[24px] font-bold">${post.title}</h2>
                        <p class="text-start">
                            ${post.description}
                        </p>
                        <div class="card-actions flex gap-5 items-center">
                            <div class="avatar">
                                <div
                                    class="lg:w-12 w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src=${post.profile_image} />
                                </div>
                            </div>
                            <div class =>
                                <h3 class="text-start font-extrabold">${post.author.name}</h3>
                                <p class="text-start opacity-60">${post.author.designation ? post.author.designation : "Unknown"}</p>
                            </div>
                        </div>


                        <span id="latestPostLoader"
                            class="loading loading-infinity loading-lg lg:mt-24 text-primary hidden">
                        </span>
                        
                    </div>
        `
        latestPostContainer.appendChild(div);
    })
}

loadLatestPosts();
loadPosts();
