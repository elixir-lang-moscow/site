defmodule ElixirLangMoscow.Avatar do
  use Arc.Definition

  # Include ecto support (requires package arc_ecto installed):
  use Arc.Ecto.Definition

  @versions [:original]

  # To add a thumbnail version:
  # @versions [:original, :thumb]
  @extension_whitelist ~w(.jpg .jpeg .gif .png)
  @base_storage_dir "priv/static/media/user/avatars"

  # Whitelist file extensions:
  def validate({file, _}) do
    file_extension = file.file_name |> Path.extname |> String.downcase
    Enum.member?(@extension_whitelist, file_extension)
  end

  # Define a thumbnail transformation:
  # def transform(:thumb, _) do
  #   {:convert, "-strip -thumbnail 250x250^ -gravity center -extent 250x250 -format png", :png}
  # end

  # Override the persisted filenames:
  # def filename(version, _) do
  #   version
  # end

  def __storage, do: Arc.Storage.Local

  # Override the storage directory:
  def storage_dir(_version, {_file, scope}) do
    @base_storage_dir <> "/#{scope.slug}" # TODO: add slug
  end
  def storage_dir(_, {_, nil}) do
    @base_storage_dir
  end

  # Provide a default URL if there hasn't been a file uploaded
  def default_url(version, scope) do
    "http://placehold.it/200x200"
  end
end
