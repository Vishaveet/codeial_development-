{
    let createPost = function () {
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function (data) {
                    console.log(data);
                    let newPost = newPostDom(data.data.post, data.data.user);
                    $(`#posts-list-container>ul`).prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));

                    // call the create comment class
                    new PostComments(data.data.post._id);


                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500

                    }).show();
                },
                error: function (error) {
                    console.log(error.responseText);
                }
            })
        })
    }

    // method to create a post in DOM

    let newPostDom = function (post, user) {
        return $(`<li id="post-${post._id}">

        <p>
                <small>
                    <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
                </small>
                
                    ${post.content}
                        <br>
                        <small>
                            ${user}
                        </small>
        </p>
        <div class="post-comments">
                <form action="/comments/create" method="post" id="post-${post._id}-comments-form">
                    <input type="text" name="content" placeholder="write here to add comments.." required>
                    <input type="hidden" name="post" value="${post._id}">
                    <input type="submit" value="Add Comment ">
                </form>
        </div>
        <div class="post-comment-list">
            <ul id="post-comments-${post._id}">
              
            </ul>
        </div>
    </li>`)
    }

    // method to delete the post to DOM

    let deletePost = function (deleteLink) {
        $(deleteLink).click(function (e) {
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500

                    }).show();
                }, error: function (error) {
                    console.log(error.responseText);
                }
            })
        })


    }


    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function () {
        $('#posts-list-container>ul>li').each(function () {
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            console.log("po",PostComments);
            new PostComments(postId);

        });
    }



    createPost();
    convertPostsToAjax();


}