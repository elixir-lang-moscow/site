# TODO: create task `mix command.save.csv` to download a csv-file with
# the all created registration and format (what data do we need?)

defmodule Mix.Tasks.Command.Create.Admin do
  use Mix.Task

  alias Mix.ElixirLangMoscow.Utils
  alias ElixirLangMoscow.Admin
  alias ElixirLangMoscow.Repo

  @shortdoc "Creates an admin account"

  defp parse_args(args) do
    args
    |> Enum.map(fn (item) -> List.to_tuple(String.split(item, ":")) end)
    |> Enum.into(%{})
  end

  def error(message), do: IO.puts "==> #{IO.ANSI.red}#{message}#{IO.ANSI.reset}"

  def run(args) do
    params = parse_args(args)
    changeset = Admin.changeset(%Admin{}, params)

    if changeset.valid? do
      Repo.start_link
      admin = Repo.insert!(changeset)
      Utils.info("Created: #{admin.username}")
    else
      Utils.error(inspect(changeset.errors))
    end

  end
end
