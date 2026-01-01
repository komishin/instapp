class DropArticles < ActiveRecord::Migration[8.1]
  def change
    drop_table :articles do |t|
      t.text :caption
      t.integer :likes_count, default: 0
      t.bigint :user_id, null: false
      t.timestamps
    end
  end
end
