# defmodule ElixirLangMoscow.Speaker.Slug do
#   use EctoAutoslugField.Slug, from: :name, to: :slug
#
#   def build_slug(sources), do: super(sources)
# end

defmodule ElixirLangMoscow.Speaker do
  use ElixirLangMoscow.Web, :model
  use Arc.Ecto.Model

  schema "speakers" do
    field :name, :string
    field :company, :string

    field :slug, :string  # ElixirLangMoscow.Speaker.Slug.Type
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
    |> ElixirLangMoscow.SlugGenerator.maybe_generate_slug(:name)
    |> unique_constraint(:slug)
    |> cast_attachments(params, @required_file_fields, @optional_file_fields)
  end

  def avatar_url(model) do
    ElixirLangMoscow.Avatar.url({model.avatar, model})
  end
end
