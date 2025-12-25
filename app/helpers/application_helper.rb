module ApplicationHelper
  def header_suffix
    devise_controller? ? "white" : "black"
  end

  def white_text_class
    "white_text" if devise_controller?
  end
end
