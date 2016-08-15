defmodule ElixirLangMoscow.EventControllerTest do
  use ElixirLangMoscow.ConnCase

  alias ElixirLangMoscow.Event
  alias ElixirLangMoscow.BaseTest
  @invalid_attrs %{}

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, event_path(conn, :index)
    assert conn.status == 200
  end

  test "shows chosen resource", %{conn: conn} do
    event = Repo.insert!(Event.changeset(%Event{}, BaseTest.valid_event()))
    conn = get conn, event_path(conn, :show, event)
    assert conn.status == 200
  end

  test "renders page not found when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, event_path(conn, :show, "1")
    end
  end
end
