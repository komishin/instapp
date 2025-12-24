class CreateProfiles < ActiveRecord::Migration[8.1]
  def change
    create_table :profiles do |t|
      t.references :user, null: false, foreign_key: true

      # 以下の「カウンターキャッシュ」用カラムを追加
      t.integer :posts_count, default: 0      # 自分の投稿数
      t.integer :followers_count, default: 0  # フォロワー数
      t.integer :following_count, default: 0  # フォロー中の数
      t.timestamps
    end
  end
end
