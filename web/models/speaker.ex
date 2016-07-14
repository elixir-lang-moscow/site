defmodule ElixirLangMoscow.Speaker do
  use ElixirLangMoscow.Web, :model
  use Arc.Ecto.Model

  schema "speakers" do
    field :name, :string
    field :company, :string

    field :slug, :string
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
    |> generate_slug
    |> unique_constraint(:slug)
    |> cast_attachments(params, @required_file_fields, @optional_file_fields)
  end

  def avatar_url(model) do
    definition = {model.avatar, model}
    parts = ElixirLangMoscow.Avatar.url(definition) |> Path.split
    path =
      parts
      |> Enum.slice(2..length(parts))
      |> Path.join

    "/" <> path
  end

  defp generate_slug(changeset) do
    name = get_change(changeset, :name)
    slug = changeset.model.slug

    if name != nil and slug == nil do # only at initial state
      put_change(changeset, :slug, Slugger.slugify_downcase(name))
    else
      changeset
    end
  end
end
