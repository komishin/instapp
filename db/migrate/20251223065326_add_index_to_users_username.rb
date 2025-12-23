class AddIndexToUsersUsername < ActiveRecord::Migration[8.1]
  def change
    # unique: true をつけることで、DBレベルで重複を禁止します
    add_index :users, :username, unique: true
  end
end
