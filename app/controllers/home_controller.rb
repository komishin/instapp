class HomeController < ApplicationController
def index
    # データベースからすべての投稿を取得し、作成日順（新しい順）に並べて代入する
    @posts = Post.all.order(created_at: :desc)
  end
end
