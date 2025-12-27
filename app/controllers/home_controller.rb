class HomeController < ApplicationController
  def index
    # includes を使って、投稿に紐づくユーザーとプロフィールをまとめて取得する
    @posts = Post.all.includes(user: :profile).order(created_at: :desc)

    if user_signed_in?
      @profile = current_user.prepare_profile
    end
  end
end
