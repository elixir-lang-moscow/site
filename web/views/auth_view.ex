defmodule ElixirLangMoscow.AuthView do
  use ElixirLangMoscow.Web, :view

  def render("500.html", _assigns) do
  	"Not authed"
  end

  def current_user(conn) do
  	ElixirLangMoscow.Authentication.current_user conn
  end
end
