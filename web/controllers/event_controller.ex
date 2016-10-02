defmodule ElixirLangMoscow.EventController do
  use ElixirLangMoscow.Web, :controller

  alias ElixirLangMoscow.{Event, EventPartner, EventSpeaker}

  def index(conn, _params) do
    speakers_query = EventSpeaker.query_order()
      |> Ecto.Query.preload(:speaker)

    events =
      Repo.all(
        from e in Event,
        where: e.visible == true,
        order_by: [desc: :time_at],
        preload: [
          event_speakers: ^speakers_query,
        ]
      )
    render(conn, "index.html", events: events)
  end

  def show(conn, %{"id" => id}) do
    speakers_query = EventSpeaker.query_order()
      |> Ecto.Query.preload(:speaker)

    event =
      Repo.get_by!(Event, [id: id, visible: true])
      |> Repo.preload([
        event_speakers: speakers_query,
      ])

    event_partners =
      Repo.all(
        from ep in EventPartner,
        where: ep.event_id == ^event.id,
        order_by: [desc: :priority],
        preload: [:partner]
      )

    render(conn, "show.html", event: event, event_partners: event_partners)
  end
end
