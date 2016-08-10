defmodule ElixirLangMoscow.EventSpeakerSlug do
  use EctoAutoslugField.Slug, from: :title, to: :slug
end

defmodule ElixirLangMoscow.EventSpeaker do
  use ElixirLangMoscow.Web, :model

  alias ElixirLangMoscow.EventSpeakerSlug

  schema "event_speakers" do
    field :title, :string
    field :description, :string
    field :slug, EventSpeakerSlug.Type

    field :video_link, :string

    belongs_to :event, ElixirLangMoscow.Event
    belongs_to :speaker, ElixirLangMoscow.Speaker

    timestamps
  end

  @required_fields ~w(title speaker_id event_id)
  @optional_fields ~w(slug description video_link)

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
    |> unique_constraint(:title)
    |> unique_constraint(:video_link)
    |> EventSpeakerSlug.maybe_generate_slug
    |> EventSpeakerSlug.unique_constraint
  end
end
