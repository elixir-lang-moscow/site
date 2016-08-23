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
end
