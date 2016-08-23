defmodule ElixirLangMoscow.EventPartner do
  use ElixirLangMoscow.Web, :model

  schema "event_partners" do
    field :priority, :integer, default: 1

    belongs_to :event, ElixirLangMoscow.Event
    belongs_to :partner, ElixirLangMoscow.Partner

    timestamps
  end

  @required_fields ~w(event_id partner_id priority)
  @optional_fields ~w()

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end
end
