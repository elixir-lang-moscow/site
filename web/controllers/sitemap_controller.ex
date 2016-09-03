defmodule ElixirLangMoscow.SitemapController do
  use ElixirLangMoscow.Web, :controller

  alias ElixirLangMoscow.Repo
  alias ElixirLangMoscow.{Speaker, EventSpeaker, Event}

  def index(conn, _params) do
    speakers = Repo.all(
      from s in Speaker,
      order_by: [desc: s.id]
    )

    events = Repo.all(
      from e in Event,
      where: e.visible == true,
      order_by: [desc: e.id]
    )

    event_speakers = Repo.all(
      from t in EventSpeaker,
      order_by: [desc: t.id]
    )

    conn
    |> put_resp_content_type("application/xml")
    |> render("index.xml", speakers: speakers,
      events: events, event_speakers: event_speakers)
  end
end
