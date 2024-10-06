
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

    posts.forEach((post) => {
        const div = document.createElement('div');

        div.innerHTML = `
         <div class="w-full lg:w-[772px] space-y-5 bg-[#797dfc]/10 p-10 rounded-3xl flex flex-col md:flex-row gap-6">

                <div class="indicator">
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
    loadPosts(searchText);
}

loadPosts();
