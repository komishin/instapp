class ProfilesController < ApplicationController
  before_action :authenticate_user!

  def show
    @profile = current_user.profile
  end

  def edit
    @profile = current_user.profile
  end

  def update
    @profile = current_user.profile
    if @profile.update(profile_params)
      # 成功したらプロフィール画面に戻す
      redirect_to profile_path, notice: "画像を更新しました"
    else
      # 失敗したら表示し直す（status: :unprocessable_entity が重要）
      render :show, status: :unprocessable_entity
    end
  end
end

  private

  def profile_params
    params.require(:profile).permit(:avatar)
  end
