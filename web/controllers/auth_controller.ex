defmodule ElixirLangMoscow.AuthController do
  use ElixirLangMoscow.Web, :controller

  alias ElixirLangMoscow.Admin
  alias ElixirLangMoscow.PasswordHasher

  def unauthenticated(conn, _params) do
    redirect(conn, to: auth_path(conn, :new))
  end

  def new(conn, _params) do
    render(conn, "login.html")
  end

  def create(conn, %{"login" => login}) do
    %{"username" => username, "password" => password} = login
    user = Repo.get_by(Admin, [username: username, active: true])

    case authenticate(user, password) do
      {:ok, user} ->
        conn
        |> Guardian.Plug.sign_in(user)
        |> put_flash(:info, "Logged in")
        |> redirect(to: "/")
      :error ->
        conn
        |> put_flash(:error, "Wrong username or password")
        |> render("login.html")
    end
  end

  def destroy(conn, _params) do
    conn
    |> Guardian.Plug.sign_out
    |> redirect(to: "/")
  end

  defp authenticate(user, password) do
    # user can still be `nil`:
    case PasswordHasher.check_hash(user, password) do
      true -> {:ok, user}
      _ -> :error
    end
  end

end
