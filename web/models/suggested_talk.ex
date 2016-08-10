defmodule ElixirLangMoscow.SuggestedTalk do
  use ElixirLangMoscow.Web, :model

  schema "suggested_talks" do
    field :name, :string
    field :email, :string

    field :topic, :string

    field :message, :string
    field :seen, :boolean, default: false

    # TODO: add recaptcha when v2 will be ready

    timestamps
  end

  @required_fields ~w(name email topic message)
  @optional_fields ~w(seen)

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
    |> validate_format(:email, ~r/@/)
  end
end
