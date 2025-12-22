class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  # Changes to the importmap will invalidate the etag for HTML responses
  stale_when_importmap_changes

  # Deviseのコントローラーが動くときに、名前を許可するメソッドを呼ぶ
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    # アカウント登録（sign_up）の際に、nameを保存できるように許可する
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username])
    # アカウント更新（account_update）の際も必要なら追加
    devise_parameter_sanitizer.permit(:account_update, keys: [:username])
  end
end
