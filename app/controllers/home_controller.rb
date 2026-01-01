class HomeController < ApplicationController
  def index
    # includes を使って、投稿に紐づくユーザーとプロフィールをまとめて取得する
    @posts = Post.all.includes(user: :profile).order(created_at: :desc)

    if user_signed_in?
      @profile = current_user.prepare_profile
    end

    # app/controllers/home_controller.rb
    def index
      # .includes(:likes, likes: :user) を追加して、関連データを一気に取得する
      @posts = Post.all.includes(likes: :user).order(created_at: :desc)
    end
  end
end
