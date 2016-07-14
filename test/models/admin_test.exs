defmodule ElixirLangMoscow.AdminTest do
  use ElixirLangMoscow.ModelCase

  alias ElixirLangMoscow.Admin

  @valid_attrs %{
    password: "some-pass",
    password_confirmation: "some-pass",
    username: "admin",
  }
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Admin.changeset(%Admin{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Admin.changeset(%Admin{}, @invalid_attrs)
    refute changeset.valid?
  end
end
