defmodule ElixirLangMoscow.EventSpeaker do
  use ElixirLangMoscow.Web, :model

  schema "event_speakers" do
    field :title, :string
    field :description, :string
    field :slug, :string

    belongs_to :event, ElixirLangMoscow.Event
    belongs_to :speaker, ElixirLangMoscow.Speaker

    timestamps
  end

  @required_fields ~w(title speaker_id event_id)
  @optional_fields ~w(slug description)

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
    |> unique_constraint(:title)
    |> generate_slug
  end

  defp generate_slug(changeset) do
    title = get_change(changeset, :title)
    slug = changeset.model.slug

    if title != nil and slug == nil do # only at initial state
      put_change(changeset, :slug, Slugger.slugify_downcase(title))
    else
      changeset
    end
  end
end
