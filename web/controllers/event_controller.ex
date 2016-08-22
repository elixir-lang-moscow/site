defmodule ElixirLangMoscow.EventController do
  use ElixirLangMoscow.Web, :controller

  alias ElixirLangMoscow.Event

  def index(conn, _params) do
    events =
      Repo.all(from e in Event, order_by: [desc: :time_at])
      |> Repo.preload([{:event_speakers, :speaker}])
    render(conn, "index.html", events: events)
  end

  def show(conn, %{"id" => id}) do
    event =
      Repo.get!(Event, id)
      |> Repo.preload([
        {:event_speakers, :speaker},
        {:event_partners, :partner},
      ])
    render(conn, "show.html", event: event)
  end
end
