defmodule ElixirLangMoscow.Event do
  use ElixirLangMoscow.Web, :model

  schema "events" do
    field :name, :string
    field :location, :string
    field :time_at, Ecto.DateTime

    field :uid, :string # unique id from the TimePad
    field :registration_link, :string

    has_many :registrations, ElixirLangMoscow.Registration

    has_many :event_speakers, ElixirLangMoscow.EventSpeaker
    has_many :speakers, through: [:event_speakers, :speaker]

    timestamps
  end

  @required_fields ~w(name location time_at uid registration_link)
  @optional_fields ~w()

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
    |> unique_constraint(:uid)
  end
end
