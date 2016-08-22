defmodule ElixirLangMoscow.EventPartnerTest do
  use ElixirLangMoscow.ModelCase

  alias ElixirLangMoscow.EventPartner

  @invalid_attrs %{}

  # setup do
  #   partner = BaseTest.create_partner()
  #   event = BaseTest.create_event()
  #
  #   {:ok, %{partner: partner, event: event}}
  # end

  # TODO: add setup with create_event and create_partner

  # test "changeset with valid attributes", %{partner: partner, event: event} do
  #   changeset = EventPartner.changeset(%EventPartner{}, %{
  #     "partner_id" => partner.id,
  #     "event_id" => event.id,
  #   })
  #   assert changeset.valid?
  # end

  test "changeset with invalid attributes" do
    changeset = EventPartner.changeset(%EventPartner{}, @invalid_attrs)
    refute changeset.valid?
  end
end
