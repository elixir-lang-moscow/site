defmodule ElixirLangMoscow.PartnerTest do
  use ElixirLangMoscow.ModelCase

  alias ElixirLangMoscow.Partner

  @invalid_attrs %{}

  # TODO: setup proper tests with `ExMachina`
  # test "changeset with valid attributes" do
  #   changeset = Partner.changeset(%Partner{}, BaseTest.valid_partner())
  #   assert changeset.valid?
  # end

  test "changeset with invalid attributes" do
    changeset = Partner.changeset(%Partner{}, @invalid_attrs)
    refute changeset.valid?
  end
end
