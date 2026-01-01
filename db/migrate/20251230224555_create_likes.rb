class CreateLikes < ActiveRecord::Migration[8.1]
  def change
    create_table :likes do |t|
      # 「誰が」
      t.references :user, null: false, foreign_key: true
      # 「どの投稿に」 (Postモデルがある場合)
      t.references :post, null: false, foreign_key: true

      t.timestamps
    end

    # 同じユーザーが同じ投稿に何度もいいねできないように制限する場合
    add_index :likes, [ :user_id, :post_id ], unique: true
  end
end
