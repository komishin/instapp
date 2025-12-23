class Profile < ApplicationRecord
  belongs_to :user
  has_one_attached :avatar

  delegate :username, to: :user
end
