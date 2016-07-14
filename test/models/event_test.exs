defmodule ElixirLangMoscow.EventTest do
  use ElixirLangMoscow.ModelCase

  alias ElixirLangMoscow.BaseTest
  alias ElixirLangMoscow.Event

  @invalid_attrs %{any_other: "value"}

  test "changeset with valid attributes" do
    changeset = Event.changeset(%Event{}, BaseTest.valid_event())
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Event.changeset(%Event{}, @invalid_attrs)
    refute changeset.valid?
  end
end
