class PostsController < ApplicationController
  # 1. destroy を追加してログイン必須にする
  before_action :authenticate_user!, only: [:new, :create, :destroy]
  
  # 2. 削除前に「自分の投稿か」を確認する
  before_action :set_post, only: [:destroy]
  before_action :authorize_user!, only: [:destroy]

  def new
    @post = Post.new
    @profile = current_user.prepare_profile
  end

  def create
    @post = current_user.posts.build(post_params)
    if @post.save
      redirect_to root_path, notice: "投稿しました！"
    else
      @profile = current_user.prepare_profile
      flash.now[:error] = "投稿に失敗しました"
      render :new, status: :unprocessable_entity
    end
  end

  # 3. 削除アクションを追加
  def destroy
    if @post.destroy
      redirect_to root_path, notice: "投稿を削除しました", status: :see_other
    else
      redirect_to root_path, alert: "削除に失敗しました"
    end
  end

  private

  def post_params
    params.require(:post).permit(:caption, :likes_count, images: [])
  end

  # 削除対象の投稿を取得する共通処理
  def set_post
    @post = Post.find(params[:id])
  end

  # 他人の投稿を削除できないように制限
  def authorize_user!
    unless @post.user == current_user
      redirect_to root_path, alert: "権限がありません"
    end
  end
end
