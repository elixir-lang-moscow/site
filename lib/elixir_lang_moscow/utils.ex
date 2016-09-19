defmodule ElixirLangMoscow.Utils do
  def pretty_time(datetime) do
    use Timex

    Timex.format!(datetime, "%F %H:%M", :strftime)
  end

  def validate_extension(allowed, file) do
    file_extension =
      file.file_name
      |> Path.extname
      |> String.downcase
    Enum.member?(allowed, file_extension)
  end

  def embed_youtube(link) do
    """
    <iframe width="560" height="315"
      src="https://www.youtube.com/embed/#{link}"
      frameborder="0" allowfullscreen></iframe>
    """
  end
end
