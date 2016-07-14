defmodule ElixirLangMoscow.EventController do
  use ElixirLangMoscow.Web, :controller

  alias ElixirLangMoscow.Event

  def index(conn, _params) do
    events = Repo.all(Event)
    render(conn, "index.html", events: events)
  end

  def show(conn, %{"id" => id}) do
    event =
      Repo.get!(Event, id)
      |> Repo.preload([:speakers])
    render(conn, "show.html", event: event)
  end
end
