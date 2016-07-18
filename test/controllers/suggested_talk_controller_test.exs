defmodule ElixirLangMoscow.SuggestedTalkControllerTest do
  use ElixirLangMoscow.ConnCase

  alias ElixirLangMoscow.SuggestedTalk

  @valid_attrs %{
    email: "some@content.com",
    message: "some content",
    name: "some content",
    seen: true,
    topic: "some content",
  }
  @invalid_attrs %{}

  test "renders form for new resources", %{conn: conn} do
    conn = get conn, suggested_talk_path(conn, :new)
    assert html_response(conn, 200) =~ "New suggested talk"
  end

  test "creates resource and redirects when data is valid", %{conn: conn} do
    conn = post conn, suggested_talk_path(conn, :create), suggested_talk: @valid_attrs
    assert redirected_to(conn) == suggested_talk_path(conn, :new)
    assert Repo.get_by(SuggestedTalk, @valid_attrs)
  end

  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, suggested_talk_path(conn, :create), suggested_talk: @invalid_attrs
    assert html_response(conn, 200) =~ "New suggested talk"
  end
end
