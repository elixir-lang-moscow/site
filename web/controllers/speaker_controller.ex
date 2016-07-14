defmodule ElixirLangMoscow.SpeakerController do
  use ElixirLangMoscow.Web, :controller

  alias ElixirLangMoscow.Speaker

  def index(conn, _params) do
    speakers = Repo.all(Speaker)
    render(conn, "index.html", speakers: speakers)
  end

  def show(conn, %{"id" => slug}) do
    speaker =
      Repo.get_by!(Speaker, slug: slug)
      |> Repo.preload([:event_speakers, :events])
    render(conn, "show.html", speaker: speaker)
  end
end
