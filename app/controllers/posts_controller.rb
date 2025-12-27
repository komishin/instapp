class PostsController < ApplicationController
  before_action :authenticate_user!

  def new
    @post = Post.new
  end

  def create
    @post = current_user.posts.build(post_params)
    if @post.save
      redirect_to root_path, notice: "投稿しました！"
    else
      render :new
    end
  end

  private

  def post_params
    # images: [] と書くことで、複数の画像を受け取れるようになります
    params.require(:post).permit(:caption, :likes_count, images: [])
  end
end
