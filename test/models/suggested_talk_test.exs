defmodule ElixirLangMoscow.SuggestedTalkTest do
  use ElixirLangMoscow.ModelCase

  alias ElixirLangMoscow.SuggestedTalk

  @valid_attrs %{
    email: "some@content.com", 
    message: "some content",
    name: "some content",
    seen: true,
    topic: "some content",
  }
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = SuggestedTalk.changeset(%SuggestedTalk{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = SuggestedTalk.changeset(%SuggestedTalk{}, @invalid_attrs)
    refute changeset.valid?
  end
end
