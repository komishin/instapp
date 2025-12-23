class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :username, uniqueness: true, presence: true # presence（存在チェック）も入れるとより安全

  has_one :profile, dependent: :destroy
  has_many :posts, dependent: :destroy

  # ユーザー登録後にプロフィールを自動作成
  after_create :prepare_profile

  private

  def prepare_profile
    # user_id は自動で入りますが、profile側にusernameカラムがある場合は明示的に渡します
    # もしprofileにusernameカラムを作らない設計（Userから参照する設計）なら、単に create_profile でOKです。
    create_profile
  end
end
