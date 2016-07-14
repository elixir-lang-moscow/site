defmodule ElixirLangMoscow.RegistrationTest do
  use ElixirLangMoscow.ModelCase

  alias ElixirLangMoscow.BaseTest
  alias ElixirLangMoscow.Registration

  @invalid_attrs %{}

  setup do
    event = BaseTest.create_event()
    valid_attrs = BaseTest.valid_registration()
    {:ok, values: Map.put(valid_attrs, :event_id, event.id)}
  end

  test "changeset with valid attributes", context do
    changeset = Registration.changeset(%Registration{}, context.values)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Registration.changeset(%Registration{}, @invalid_attrs)
    refute changeset.valid?
  end
end
