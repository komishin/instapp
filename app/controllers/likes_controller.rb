class LikesController < ApplicationController
  before_action :authenticate_user!
  # 共通の処理（Postの取得）をまとめることもできますが、まずは明解さ優先で
  
  def show
    post = Post.find(params[:post_id])
    render json: { hasLiked: current_user.has_liked?(post) }
  end

  def create
    post = Post.find(params[:post_id])
    # 重複して作成されないように find_or_create_by を使うと安全
    current_user.likes.find_or_create_by!(post_id: post.id)

    # 成功した後の最新の状態を返す
    render json: { hasLiked: true }
  end

  def destroy
    post = Post.find(params[:post_id])
    like = current_user.likes.find_by(post_id: post.id)
    like&.destroy! # &.(ぼっち演算子)で、もし既に削除されていてもエラーにしない

    # 削除した後の最新の状態を返す
    render json: { hasLiked: false }
  end
end
