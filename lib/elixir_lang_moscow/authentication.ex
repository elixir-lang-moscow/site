defimpl ExAdmin.Authentication, for: Plug.Conn do
  alias ElixirLangMoscow.Router.Helpers
  alias ElixirLangMoscow.Authentication, as: Auth

  def use_authentication?(_), do: true

  def current_user(conn), do: Auth.current_user(conn)

  def current_user_name(conn) do
    user = Auth.current_user(conn)
    case user do
      nil -> "Anonymous"
      _ -> user.username
    end
  end

  def session_path(conn, action), do: Helpers.auth_path(conn, action)
  
end


defmodule ElixirLangMoscow.Authentication do
  def current_user(conn) do
    Guardian.Plug.current_resource(conn)
  end
end
