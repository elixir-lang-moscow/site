defmodule ElixirLangMoscow.PageControllerTest do
  use ElixirLangMoscow.ConnCase

  test "GET /", %{conn: conn} do
    conn = get conn, page_path(conn, :index)
    assert html_response(conn, 200) =~ "<title>Elixir meetups in Moscow</title>"
  end

  test "GET /contacts", %{conn: conn} do
    conn = get conn, page_path(conn, :contacts)
    assert html_response(conn, 200) =~ "<title>Elixir meetups in Moscow</title>"
  end
end
