const loadPosts = async () =>{
    const url = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const res = await url.json();
    const data = res.posts;
    displayPosts(data);
}

const displayPosts = (posts) =>{

    const postContainer = document.getElementById('post-container');
    posts.forEach(post => {
			const {category, comment_count, description, image, isActive, title, author , posted_time, view_count} = post;
        console.log(post);
        const div = document.createElement('div');
        div.innerHTML = `
          <div class="mb-4 bg-[#797DFC1A] rounded-3xl lg:p-10 md:p-5 sm:p-3 single-post flex justify-start gap-5">
						<div class="indicator">
							<span class="indicator-item badge badge-success">
							</span>
							<div class="rounded-2xl bg-white grid h-32 w-32 place-items-center">
								
							</div>
						</div>
						<div>
							<div class="tags text-[#12132DCC] text-2xl font-bold] mb-4">
								<span class="mr-5"># ${category}</span>
								<span>Author : ${author.name}</span>
							</div>
							<h1 class="text-3xl text-black font-semibold mb-4">${title}</h1>
							<p class="mb-4 text-[#12132DCC]">${description}</p>
							<div class="flex justify-between items-center border-t-2  border-dashed pt-4">
								<div class="flex gap-5 justify-start items-start text-[#12132DCC]">
									<img src="assets/images/comment.svg" alt="">
									<span>${comment_count}</span>
									<img src="assets/images/eye.svg" alt="">
									<span>${view_count}</span>
									<img src="assets/images/clock.svg" alt="">
									<span>${posted_time}</span>
								</div>
								<div>
									<img src="assets/images/envelop.svg" alt="">
								</div>
							</div>
						</div>
					</div>
        `;
				postContainer.appendChild(div);
    })
}

loadPosts()