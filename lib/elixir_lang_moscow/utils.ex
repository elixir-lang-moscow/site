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

  def link_youtube(link), do: "https://www.youtube.com/watch?v=#{link}"

  def embed_youtube(link) do
    """
    <iframe width="560" height="315"
      src="https://www.youtube.com/embed/#{link}"
      frameborder="0" allowfullscreen></iframe>
    """
  end

  def embed_speakerdeck(slides_id) do
    """
    <script async class="speakerdeck-embed"
      data-id="#{slides_id}"
      data-ratio="1.33333333333333"
      src="//speakerdeck.com/assets/embed.js"></script>
    """
  end
end
