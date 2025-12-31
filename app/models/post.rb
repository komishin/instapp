class Post < ApplicationRecord
  belongs_to :user
  has_many_attached :images
  has_many :likes, dependent: :destroy
  has_one_attached :eyecatch

  # 数値フォーマット用のモジュールを読み込む（カンマ区切りのため）
  include ActionView::Helpers::NumberHelper

  def like_text
    return "" if likes.count == 0

    latest_like_user = likes.order(created_at: :desc).first.user

    if likes.count == 1
      "Liked by #{latest_like_user.username}"
    else
      # number_with_delimiter を使うと 12000 が 12,000 になります
      other_count = number_with_delimiter(likes.count - 1)
      "#{latest_like_user.username} and #{other_count} others liked your post"
    end
  end
end
