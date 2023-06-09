const blogList = document.getElementById('blogList');
const searchBar = document.getElementById('searchBar');
let blogpost = [];

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredBlogs = blogpost.filter((blog) => {
        return (
            blog.title.toLowerCase().includes(searchString) ||
            blog.content.toLowerCase().includes(searchString)
        );
    });
    displayblog(filteredBlogs);
});

const loadblog = async () => {
    try {
        const res = await fetch("https://maxadair.github.io/main/JSON/blog-api.json");
        blogpost = await res.json();
        displayblog(blogpost);
    } catch (err) {
        console.error(err);
    }
};

const displayblog = (blogs) => {
    const htmlString = blogs
        .map((blog) => {
            return `
            <li class="blog">
                <h2>${blog.title}</h2>
                <p>${blog.content}</p>
                <div class="home-background img" style="background-image:url(${blog.image});"></div>
            </li>
        `;
        })
        .join('');
    blogList.innerHTML = htmlString;
};

loadblog();
