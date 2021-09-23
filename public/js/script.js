$(document).ready(function(){
    $('.delete-article').on('click', function(e){
        $target = $(e.target);
        const slug = $target.attr('data-slug');
        $.ajax({
            type: 'DELETE',
            url: '/articles/'+slug,
            error: function(err){
                console.log(err);
            },
            complete: function () {
                window.location = '/';
            }

        });
    })
})

