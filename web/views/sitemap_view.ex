defmodule ElixirLangMoscow.SitemapView do
  use ElixirLangMoscow.Web, :view

  def date_format(entry) do
    entry.inserted_at |> Ecto.DateTime.to_iso8601
  end

  def last_update_date(collection) do
    collection
    |> List.first()
    |> date_format()
  end
end
