defmodule ElixirLangMoscow.Partner do
  use ElixirLangMoscow.Web, :model
  use Arc.Ecto.Model

  alias ElixirLangMoscow.PartnerLogo

  schema "partners" do
    field :name, :string
    field :link, :string

    field :image, PartnerLogo.Type

    timestamps
  end

  @required_fields ~w(name link)
  @optional_fields ~w()

  @required_file_fields ~w(image)
  @optional_file_fields ~w()

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
    |> unique_constraint(:name)
    |> cast_attachments(params, @required_file_fields, @optional_file_fields)
  end

  # TODO: test how `signed: true` works:
  def image_url(model), do: PartnerLogo.url({model.image, model})
end
