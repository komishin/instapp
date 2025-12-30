class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :username, uniqueness: true, presence: true

  has_one :profile, dependent: :destroy
  has_one_attached :avatar
  has_many :posts, dependent: :destroy
  has_many :articles, dependent: :destroy
  has_many :likes, dependent: :destroy

  # 1. 外部（Controller）から呼び出せるように private の上に置く
  def prepare_profile
    profile || create_profile
  end

  # 2. ユーザー登録後に自動作成したい場合は after_create を使う
  after_create :create_default_profile

  private

  # after_create専用の非公開メソッド
  def create_default_profile
    create_profile
  end
end
