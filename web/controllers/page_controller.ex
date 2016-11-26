defmodule ElixirLangMoscow.PageController do
  use ElixirLangMoscow.Web, :controller

  alias ElixirLangMoscow.Event
  alias ElixirLangMoscow.EventSpeaker

  defp closest_event do
    speakers_query = EventSpeaker.query_order()

    query =
      from e in Event,
      order_by: [desc: e.time_at],
      limit: 1,
      preload: [:speakers, event_speakers: ^speakers_query]

    Repo.one(query)
  end

  defp recent_talks do
    now = Ecto.DateTime.utc
    query =
      from e in EventSpeaker,
      join: v in Event, on: e.event_id == v.id,
      where: v.time_at < ^now and v.visible == true,
      order_by: [desc: v.time_at, asc: e.order],
      limit: 10,
      preload: [:speaker, :event]

    Repo.all(query)
  end

  defp recent_events do
    now = Ecto.DateTime.utc
    query =
      from e in Event,
      where: e.time_at < ^now,
      order_by: [desc: e.time_at]

    Repo.all(query)
  end

  # Public functions

  def index(conn, _params) do
    render(conn, "index.html",
      events: recent_events(),
      closest_event: closest_event(),
      recent_talks: recent_talks(),
    )
  end

  def contacts(conn, _params) do
    render(conn, "contacts.html")
  end
end
