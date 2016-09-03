defmodule ElixirLangMoscow.SitemapControllerTest do
  use ElixirLangMoscow.ConnCase, async: false

  alias ElixirLangMoscow.BaseTest
  alias ElixirLangMoscow.{Repo, EventSpeaker, Event, Speaker}

  setup do
    on_exit fn ->
      Repo.delete_all(EventSpeaker)
      Repo.delete_all(Event)
      Repo.delete_all(Speaker)
    end

    # TODO: refactor
    speaker = BaseTest.create_speaker()
    event = BaseTest.create_event()
    event_speaker = EventSpeaker.changeset(%EventSpeaker{}, %{
      event_id: event.id,
      speaker_id: speaker.id,
      title: "some-title"
    }) |> Repo.insert!

    {:ok, %{event: event, speaker: speaker, event_speaker: event_speaker}}
  end

  test "sitemap has the right content-type header" do
    conn = get conn, sitemap_path(conn, :index)
    content_type = get_resp_header(conn, "content-type")

    assert content_type == ["application/xml; charset=utf-8"]
  end

  test "sitemap has dynamic data", fixtures do
    %{speaker: speaker, event_speaker: event_speaker} = fixtures

    conn = get conn, sitemap_path(conn, :index)
    body = conn.resp_body

    assert body =~ speaker.slug
    assert body =~ event_speaker.slug
  end
end
