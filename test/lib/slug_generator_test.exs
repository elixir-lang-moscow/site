defmodule ElixirLangMoscow.SlugGeneratorTest do
  use ElixirLangMoscow.ModelCase

  import Ecto.Changeset

  alias ElixirLangMoscow.SlugGenerator
  alias ElixirLangMoscow.Speaker

  test "slug with single source" do
    slug =
      change(%Speaker{})
      |> put_change(:name, "some title")
      |> SlugGenerator.maybe_generate_slug(:name)
      |> get_change(:slug, nil)

    assert slug == "some-title"
  end

  test "slug with multiple sources" do
    slug =
      change(%Speaker{})
      |> put_change(:name, "some title")
      |> put_change(:company, "company")
      |> SlugGenerator.maybe_generate_slug([:name, :company])
      |> get_change(:slug, nil)

    assert slug == "some-title-company"
  end

  test "slug on empty changeset" do
    slug =
      change(%Speaker{})
      |> SlugGenerator.maybe_generate_slug(:some)
      |> get_change(:slug, nil)

    assert slug == nil
  end
end
