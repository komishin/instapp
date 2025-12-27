class PostsController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create]

  def new
    @post = Post.new
    @profile = current_user.prepare_profile
  end

  def create
    @post = current_user.posts.build(post_params)
    if @post.save
      redirect_to root_path, notice: "投稿しました！"
    else
      # render :new で戻った時もビューで @profile を使うので、ここでも定義が必要です
      @profile = current_user.prepare_profile
      flash.now[:error] = "投稿に失敗しました"
      render :new, status: :unprocessable_entity
    end
  end

  private

  def post_params
    # images: [] と書くことで、複数の画像を受け取れるようになる
    params.require(:post).permit(:caption, :likes_count, images: [])
  end
end
