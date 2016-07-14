defmodule ElixirLangMoscow.PageControllerTest do
  use ElixirLangMoscow.ConnCase

  test "GET /", %{conn: conn} do
    conn = get conn, "/"
    assert html_response(conn, 200) =~ "<title>Elixir meetups in Moscow</title>"
  end
end
