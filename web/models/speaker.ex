defmodule ElixirLangMoscow.SpeakerSlug do
  use EctoAutoslugField.Slug, from: [:name, :company], to: :slug
end

defmodule ElixirLangMoscow.Speaker do
  use ElixirLangMoscow.Web, :model
  use Arc.Ecto.Model

  alias ElixirLangMoscow.SpeakerSlug

  schema "speakers" do
    field :name, :string
    field :company, :string

    field :slug, SpeakerSlug.Type
    field :avatar, ElixirLangMoscow.Avatar.Type

    has_many :event_speakers, ElixirLangMoscow.EventSpeaker
    has_many :events, through: [:event_speakers, :event]

    timestamps
  end

  @required_fields ~w(name)
  @optional_fields ~w(slug company)

  @required_file_fields ~w()
  @optional_file_fields ~w(avatar)

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
    |> SpeakerSlug.maybe_generate_slug
    |> SpeakerSlug.unique_constraint
    |> cast_attachments(params, @required_file_fields, @optional_file_fields)
  end

  def avatar_url(model) do
    # TODO: test how `signed: true` works:
    ElixirLangMoscow.Avatar.url({model.avatar, model})
  end
end
