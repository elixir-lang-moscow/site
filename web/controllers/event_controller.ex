defmodule ElixirLangMoscow.EventController do
  use ElixirLangMoscow.Web, :controller

  alias ElixirLangMoscow.{Event, EventPartner}

  def index(conn, _params) do
    events =
      Repo.all(
        from e in Event,
        where: e.visible == true,
        order_by: [desc: :time_at])
      |> Repo.preload([{:event_speakers, :speaker}])
    render(conn, "index.html", events: events)
  end

  def show(conn, %{"id" => id}) do
    event =
      Repo.get!(Event, id)
      |> Repo.preload([
        {:event_speakers, :speaker},
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
