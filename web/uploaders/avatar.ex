defmodule ElixirLangMoscow.Avatar do
  use Arc.Definition

  # Include ecto support (requires package arc_ecto installed):
  use Arc.Ecto.Definition

  @versions [:original]
  @extension_whitelist ~w(.jpg .jpeg .png)

  # Whitelist file extensions:
  def validate({file, _}) do
    # TODO: validate size
    file_extension =
      file.file_name
      |> Path.extname
      |> String.downcase
    Enum.member?(@extension_whitelist, file_extension)
  end

  def storage_dir(_version, {_file, scope}) do
    "#{Mix.env}/uploads/avatars/#{scope.slug}"
  end

  # Provide a default URL if there hasn't been a file uploaded
  def default_url(_version, _scope) do
    "http://placehold.it/200x200"
  end

  def s3_object_headers(_version, {file, _scope}) do
    # For "image.png", would produce: "image/png"
    [content_type: Plug.MIME.path(file.file_name)]
  end
end
