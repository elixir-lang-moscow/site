defmodule ElixirLangMoscow.EventSpeaker do
  use ElixirLangMoscow.Web, :model
  alias ElixirLangMoscow.SlugGenerator

  schema "event_speakers" do
    field :title, :string
    field :description, :string
    field :slug, :string

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
    |> SlugGenerator.maybe_generate_slug(:title)
    |> unique_constraint(:slug)
    |> unique_constraint(:title)
    |> unique_constraint(:video_link)
  end
end
