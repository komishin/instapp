class LikesController < ApplicationController
  before_action :authenticate_user!

  def create
    post = Post.find(params[:post_id])
    # current_userに紐づけて作成（この方が「誰のいいねか」が明確）
    current_user.likes.create!(post_id: post.id)

    # 元いた画面（一覧なら一覧、詳細なら詳細）に戻る
    redirect_back(fallback_location: root_path)
  end

  def destroy
    post = Post.find(params[:post_id])
    # current_userのいいねの中から、この投稿に関するものを探す
    like = current_user.likes.find_by!(post_id: post.id)

    like.destroy!
    # 元いた画面に戻る
    redirect_back(fallback_location: root_path)
  end
end
