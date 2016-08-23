defmodule ElixirLangMoscow.Event do
  use ElixirLangMoscow.Web, :model

  schema "events" do
    field :name, :string
    field :location, :string
    field :time_at, Ecto.DateTime

    field :uid, :string
    field :registration_link, :string
    field :max_registrations, :integer

    field :on_air, :boolean, default: false
    field :translation_link, :string
    field :visible, :boolean, defaule: true

    has_many :registrations, ElixirLangMoscow.Registration

    has_many :event_speakers, ElixirLangMoscow.EventSpeaker
    has_many :speakers, through: [:event_speakers, :speaker]

    has_many :event_partners, ElixirLangMoscow.EventPartner
    has_many :partners, through: [:event_partners, :partner]

    timestamps
  end

  @required_fields ~w(
    name location time_at uid registration_link max_registrations
    on_air visible
  )
  @optional_fields ~w(translation_link)

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
