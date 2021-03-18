class FetchHelper {
    async getPosts(url) {
        try {
            let posts  = await fetch(url);
            posts = await  posts.json();
            if (posts.hasOwnProperty('error')) {
                return 'error';
            }else {
                return posts;
            }
        } catch (error) {
            console.log(error)
            return 'error'
        }
    }
    todate(date) {
        let d = new Date(date);
        d = d.toUTCString();
        d = d.slice(0, d.length-4)
        return d;
    }
    tags(tagsArr) {        
        if (tagsArr[0] !== null) {
            let tags = [];
            tagsArr.forEach(tag => {
                tags.push(`<button class="post-tag">${tag}</button>`);
            });
            tags = tags.join(' ');
            return tags;
        }else {
            return ''
        }
    }
    async loadPosts(_post) {
        try {
            let posts = await _post;
            if (posts === 'error' || posts.length === 0) {
                console.log('eror');
                content.innerHTML = '<h1 class="four0four">There is no post for today</h1>';
                return;
            }
            let _posts = [];
            posts.forEach(post => {
                _posts.push(` 
                <div class="container">
                    <div class="post">
                        <div class="post-title">
                            ${post.title}
                        </div>
                        <div class="flex">
                        <div class="post-tags">
                            ${this.tags(post.tags)}
                        </div>
                        <div class="author" style="margin-top: 15px;">
                            Author: ${post.author}
                        </div>
                        </div>
                        <div class="post-punch-line">
                            ${post.body.slice(0, 200) + "...."}
                        </div>
                        <div class="flex">
                            <div class="date">
                                ${this.todate(post.date)}
                            </div>
                            <div class="read-more">
                                <a href='${base}/posts/${post._id}'>read-more</a>
                            </div>
                        </div>
                    </div>
                </div>
                `)
            });
            let p = _posts.join(' ');
            return p;
        } catch (error) {
            content.innerHTML = '<h1 class="four0four">There is no post for today</h1>';
            console.log(error);
        }
    
    }
}
console.log(base)