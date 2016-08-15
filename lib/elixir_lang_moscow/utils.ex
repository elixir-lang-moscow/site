defmodule ElixirLangMoscow.Utils do
  def pretty_time(datetime) do
    use Timex

    Timex.format!(datetime, "%F %H:%M", :strftime)
  end
end
