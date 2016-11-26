defmodule ElixirLangMoscow.EventSpeakerController do
  use ElixirLangMoscow.Web, :controller

  alias ElixirLangMoscow.EventSpeaker

  def show(conn, %{"slug" => slug}) do
    event_speaker =
      EventSpeaker
      |> Repo.get_by!(slug: slug)
      |> Repo.preload([:event, :speaker])

    render(conn, "show.html", event_speaker: event_speaker)
  end
end
