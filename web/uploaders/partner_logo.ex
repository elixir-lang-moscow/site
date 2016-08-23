defmodule ElixirLangMoscow.PartnerLogo do
  use Arc.Definition

  # Include ecto support (requires package arc_ecto installed):
  use Arc.Ecto.Definition

  alias ElixirLangMoscow.Utils

  @versions [:original]
  @extension_whitelist ~w(.jpg .jpeg .png)
  @acl :public_read

  def validate({file, _}) do
    Utils.validate_extension(@extension_whitelist, file)
  end

  def storage_dir(_version, {_file, scope}) do
    "#{Mix.env}/uploads/partners/#{scope.name}"
  end

  # Provide a default URL if there hasn't been a file uploaded
  def default_url(_version, _scope) do
    "http://placehold.it/100x200"
  end

  def s3_object_headers(_version, {file, _scope}) do
    # For "image.png", would produce: "image/png"
    [content_type: Plug.MIME.path(file.file_name)]
  end
end
