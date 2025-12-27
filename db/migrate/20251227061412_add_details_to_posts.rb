class AddDetailsToPosts < ActiveRecord::Migration[8.1]
  def change
    # captionを追加
    add_column :posts, :caption, :text
    # likes_countを追加（デフォルトを0に設定）
    add_column :posts, :likes_count, :integer, default: 0
    # もし content カラムがもう不要なら、ここで消すこともできます
    remove_column :posts, :content, :text
  end
end
