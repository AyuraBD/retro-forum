const loadPosts = async () =>{
    const url = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const res = await url.json();
    const data = res.posts;
    displayPosts(data);
}

const displayPosts = (posts) =>{
    const postContainer = document.getElementById('post-container');
    posts.forEach(post => {
			const {id, category, comment_count, description, image, isActive, title, author , posted_time, view_count} = post;
			const div = document.createElement('div');
        div.innerHTML = `
          <div class="mb-4 bg-[#797DFC1A] rounded-3xl lg:p-10 md:p-5 sm:p-4 max-sm:p-3 single-post flex justify-start lg:gap-5 md:gap-5 sm:gap-3 max-sm:gap-2">
			<div class="indicator">
				<span id="indicator" class="indicator-item badge ${isActive ? 'badge-success' : 'badge-warning'}">
				</span>
				<div class="rounded-2xl grid lg:h-32 md:h-32 sm:h-28 max-sm:h-24 lg:w-32 md:w-32 sm:w-28 max-sm:w-24 place-items-center">
					<img class="rounded-2xl" src="${image}" alt="Author's image"/>
				</div>
			</div>
			<div class="w-full">
				<div class="tags text-[#12132DCC] lg:text-[18px] font-bold] lg:mb-4 md:mb-4 sm:mb-3 max-sm:mb-2">
					<span class="mr-3"># ${category}</span>
					<span>Author : ${author.name}</span>
				</div>
				<h1 class="lg:text-3xl md:text-3xl sm:text-2xl max-sm:text-xl text-black font-semibold mb-4 md:mb-4 sm:mb-3 max-sm:mb-2">${title}</h1>
				<p class="lg:mb-4 md:mb-4 sm:mb-3 max-sm:mb-2 text-[#12132DCC]">${description}</p>
				<div class="flex justify-between items-center border-t-2  border-dashed lg:pt-4 md:pt-4 sm:pt-3 max-sm:pt-2">
					<div class="flex lg:gap-5 md:gap-5 sm:gap-3 max-sm:gap-1 justify-start items-start text-[#12132DCC]">
						<img src="assets/images/comment.svg" alt="">
						<span>${comment_count}</span>
						<img src="assets/images/eye.svg" alt="">
						<span>${view_count}</span>
						<img src="assets/images/clock.svg" alt="">
						<span>${posted_time}</span>
					</div>
					<div>
						<button onclick="postDetails(${id})"><img src="assets/images/envelop.svg" alt=""></button>
					</div>
				</div>
			</div>
		</div>
        `;
		postContainer.appendChild(div);
    })
}




const postDetails = async (id)=>{
	try{
		const url = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts/`);
		if(!url.ok) throw new Error(`Error: ${url.status}`); 
		const res = await url.json();
		
		const post = res.posts.find(post => post.id === id);
		const {title, view_count} = post;
		const rightRead = document.getElementById('right-read-section');
		const div = document.createElement('div');
		div.classList.add('mb-4', 'bg-white', 'p-3', 'rounded-md', 'flex', 'justify-between', 'items-center');
		div.innerHTML = `
			<p>${title}</p>
			<div class="flex justify-center items-center">
				<img class="mr-2" src="assets/images/eye.svg" alt="">
				<span>${view_count}</span>
			</div>
		`
		rightRead.appendChild(div);

		const readPost = document.getElementById('read-post');
		const rightReadSection = document.getElementById('right-read-section');
		readPost.innerText = rightReadSection.childElementCount;
	}
	catch (error){
		console.error('Failed to  fetch', error)
	}
};

const latestPost = async() =>{
	const url = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`);
	const res = await url.json();
	latestPostDisplay(res);
}

const latestPostDisplay = (posts) =>{
	posts.forEach(post => {
		const {cover_image, profile_image, title, author, description} = post;
		const latestPostContainer = document.getElementById('latest-post-container');
		const div = document.createElement('div');
		div.classList.add('card', 'w-100', 'border-2',  'rounded-lg')
		div.innerHTML = `
			<div class="p-5">
				<figure>
					<img src="${cover_image}" alt="Shoes" class="rounded-xl" />
				</figure>
				<div class="pt-5">
					<div class="flex mb-2">
						<img class="mr-2" src="assets/images/calendar.svg" alt="calendar.png">
						<p>${author.posted_date ? author.posted_date : 'Published date not found'}</p>
					</div>
					<div class="mb-2">
						<h2 class="card-title text-black font-bold">${title}</h2>
						<p>${description}</p>
					</div>
					<div class="flex justify-start items-start">
						<img class="w-[50px] h-[50px] rounded-full mr-2" src="${profile_image}"/>						
						<div>
							<h3 class="text-black font-bold">${author.name}</h3>
							<p>${author.designation ? author.designation : 'Not found'}</p>
						</div>
					</div>
				</div>
			</div>
		`;
		latestPostContainer.appendChild(div);
	})
}

const searchPostText = () =>{
	const searchInput = document.getElementById('search-post');
	const searchText = searchInput.value;
	searchPost(searchText);
	searchInput.value = '';
	loader(true);
	const searchPostContainer = document.getElementById('post-container');
	searchPostContainer.innerHTML = '';
}

const searchPost = async(search) =>{
	const url = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${search}`);
	const res = await url.json();
	const posts = res.posts;
	setTimeout(() =>{
		searchPostDisplay(posts);
	},2000)
	loader(false);
}

const searchPostDisplay = (posts) =>{
	const postContainer = document.getElementById('post-container');
	posts.forEach(post => {
		const {id, category, comment_count, description, image, isActive, title, author , posted_time, view_count} = post;
		const div = document.createElement('div');
	div.innerHTML = `
	  <div class="mb-4 bg-[#797DFC1A] rounded-3xl lg:p-10 md:p-5 sm:p-4 max-sm:p-3 single-post flex justify-start lg:gap-5 md:gap-5 sm:gap-3 max-sm:gap-2">
			<div class="indicator">
				<span id="indicator" class="indicator-item badge ${isActive ? 'badge-success' : 'badge-warning'}">
				</span>
				<div class="rounded-2xl grid lg:h-32 md:h-32 sm:h-28 max-sm:h-24 lg:w-32 md:w-32 sm:w-28 max-sm:w-24 place-items-center">
					<img class="rounded-2xl" src="${image}" alt="Author's image"/>
				</div>
			</div>
			<div class="w-full">
				<div class="tags text-[#12132DCC] lg:text-[18px] font-bold] lg:mb-4 md:mb-4 sm:mb-3 max-sm:mb-2">
					<span class="mr-3"># ${category}</span>
					<span>Author : ${author.name}</span>
				</div>
				<h1 class="lg:text-3xl md:text-3xl sm:text-2xl max-sm:text-xl text-black font-semibold mb-4 md:mb-4 sm:mb-3 max-sm:mb-2">${title}</h1>
				<p class="lg:mb-4 md:mb-4 sm:mb-3 max-sm:mb-2 text-[#12132DCC]">${description}</p>
				<div class="flex justify-between items-center border-t-2  border-dashed lg:pt-4 md:pt-4 sm:pt-3 max-sm:pt-2">
					<div class="flex lg:gap-5 md:gap-5 sm:gap-3 max-sm:gap-1 justify-start items-start text-[#12132DCC]">
						<img src="assets/images/comment.svg" alt="">
						<span>${comment_count}</span>
						<img src="assets/images/eye.svg" alt="">
						<span>${view_count}</span>
						<img src="assets/images/clock.svg" alt="">
						<span>${posted_time}</span>
					</div>
					<div>
						<button onclick="postDetails(${id})"><img src="assets/images/envelop.svg" alt=""></button>
					</div>
				</div>
			</div>
		</div>
	`;
	postContainer.appendChild(div);
})

}

// Loader
const loader = (post) =>{
	const  loader = document.getElementById('loader');
	if(post){
		loader.classList.remove('hidden');
	} else{
		setTimeout( ()=>{
			loader.classList.add('hidden');
		}, 2000)
	}
}

latestPost();


loadPosts();