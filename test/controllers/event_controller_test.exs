defmodule ElixirLangMoscow.EventControllerTest do
  use ElixirLangMoscow.ConnCase

  alias ElixirLangMoscow.Event
  @valid_attrs %{
    location: "some content",
    name: "some content",
    time_at: "2010-04-17 14:00:00",
    uid: "some-unique-value",
  }
  @invalid_attrs %{}

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, event_path(conn, :index)
    assert conn.status == 200
  end

  test "shows chosen resource", %{conn: conn} do
    event = Repo.insert! %Event{}
    conn = get conn, event_path(conn, :show, event)
    assert conn.status == 200
  end

  test "renders page not found when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, event_path(conn, :show, "1")
    end
  end
end
