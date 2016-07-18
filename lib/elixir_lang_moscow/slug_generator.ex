defmodule ElixirLangMoscow.SlugGenerator do
  import Ecto.Changeset, only: [
    put_change: 3,
    get_change: 3,
  ]

  def maybe_generate_slug(
      changeset, source, slug \\ :slug)

  def maybe_generate_slug(
      changeset, source, slug) when is_list(source) do

    source_fields = Enum.map(source, fn(v) ->
      get_change(changeset, v, nil)
    end)
    do_generate_slug(changeset, source_fields, slug)
  end

  def maybe_generate_slug(
      changeset, source, slug) when is_atom(source) do

    source_field =
      get_change(changeset, source, [nil])
      |> List.wrap
    do_generate_slug(changeset, source_field, slug)
  end

  defp do_generate_slug(changeset, sources, slug) do
    slug_field = Map.get(changeset.model, slug)
    all_set = Enum.all?(sources, fn(v) -> v != nil end)

    if all_set == true and slug_field == nil do
      # This defines that `:title` was set
      # and `:slug` is not yet created:
      slug_string =
        sources
        |> Enum.join("-")
        |> Slugger.slugify_downcase

      put_change(changeset, slug, slug_string)
    else
      changeset
    end
  end
end
