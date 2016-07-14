defmodule Mix.ElixirLangMoscow.Utils do
  def debug(message), do: IO.puts "==> #{message}"
  def info(message),  do: IO.puts "==> #{IO.ANSI.green}#{message}#{IO.ANSI.reset}"
  def warn(message),  do: IO.puts "==> #{IO.ANSI.yellow}#{message}#{IO.ANSI.reset}"
  def error(message), do: IO.puts "==> #{IO.ANSI.red}#{message}#{IO.ANSI.reset}"
end