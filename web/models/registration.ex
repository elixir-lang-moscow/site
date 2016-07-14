defmodule ElixirLangMoscow.Registration do
  use ElixirLangMoscow.Web, :model

  schema "registrations" do
    field :first_name, :string
    field :last_name, :string
    field :company, :string
    field :email, :string

    field :uid, :string
    field :code, :string
    field :barcode, :string
    field :active, :boolean, default: true
    
    belongs_to :event, ElixirLangMoscow.Event

    timestamps
  end

  @required_fields ~w(first_name last_name email event_id uid code barcode)
  @optional_fields ~w(company active)

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
    |> update_change(:email, &String.downcase/1)
    |> validate_format(:email, ~r/@/)
    |> unique_constraint(:email, name: :registrations_email_event_id_index)
    |> unique_constraint(:uid)
    |> unique_constraint(:code)
    |> unique_constraint(:barcode)
  end
end
