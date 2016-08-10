defmodule ElixirLangMoscow.SuggestedTalkTest do
  use ElixirLangMoscow.ModelCase

  alias ElixirLangMoscow.BaseTest
  alias ElixirLangMoscow.SuggestedTalk

  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = SuggestedTalk.changeset(
      %SuggestedTalk{}, BaseTest.valid_suggested_talk())
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = SuggestedTalk.changeset(%SuggestedTalk{}, @invalid_attrs)
    refute changeset.valid?
  end
end
