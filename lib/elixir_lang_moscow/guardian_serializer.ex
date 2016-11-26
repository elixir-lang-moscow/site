defmodule ElixirLangMoscow.GuardianSerializer do
  @behaviour Guardian.Serializer

  alias ElixirLangMoscow.Repo
  alias ElixirLangMoscow.Admin

  def for_token(user = %Admin{}), do: {:ok, "Admin:#{user.id}"}
  def for_token(_), do: {:error, "Unknown resource type"}

  def from_token("Admin:" <> id), do: {:ok, Repo.get(Admin, id)}
  def from_token(_), do: {:error, "Unknown resource type"}
end
