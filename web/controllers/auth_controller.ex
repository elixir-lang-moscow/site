defmodule ElixirLangMoscow.GuardianSerializer do
  @behaviour Guardian.Serializer

  alias ElixirLangMoscow.Repo
  alias ElixirLangMoscow.Admin

  def for_token(user = %Admin{}), do: { :ok, "Admin:#{user.id}" }
  def for_token(_), do: { :error, "Unknown resource type" }

  def from_token("Admin:" <> id), do: { :ok, Repo.get(Admin, id) }
  def from_token(_), do: { :error, "Unknown resource type" }
end


defmodule ElixirLangMoscow.AuthController do
  use ElixirLangMoscow.Web, :controller

  alias ElixirLangMoscow.Admin
  alias ElixirLangMoscow.PasswordHasher

  def unauthenticated(conn, _params) do
    redirect(conn, to: auth_path(conn, :new))
  end

  def new(conn, params) do
    render(conn, "login.html")
  end

  def create(conn, %{"login" => login}) do
    %{"username" => username, "password" => password} = login
    user = Repo.get_by(Admin, username: username)

    case authenticate(user, password) do
      {:ok, user} ->
        conn
        |> Guardian.Plug.sign_in(user)
        |> put_flash(:info, "Logged in")
        |> redirect(to: "/")
      :error ->
        conn
        |> put_flash(:info, "Wrong username or password")
        |> render("login.html")
    end
  end

  def destroy(conn, _params) do
    conn
    |> Guardian.Plug.sign_out
    |> redirect(to: "/")
  end

  defp authenticate(user, password) do
    case PasswordHasher.check_hash(user, password) do
      true -> {:ok, user}
      _ -> :error
    end
  end

end
