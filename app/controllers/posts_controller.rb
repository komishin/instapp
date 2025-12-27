def post_params
  params.require(:post).permit(:content, images: [])
end
