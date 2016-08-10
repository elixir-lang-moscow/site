defmodule ElixirLangMoscow.SpeakerControllerTest do
  use ElixirLangMoscow.ConnCase, async: false

  alias ElixirLangMoscow.BaseTest
  alias ElixirLangMoscow.Speaker

  setup do
    on_exit fn ->
      Repo.delete_all(Speaker)
    end

    {:ok, %{speaker: BaseTest.create_speaker()}}
  end

  test "index speakers" do
    conn = get conn, speaker_path(conn, :index)

    assert html_response(conn, 200) =~ "<h1>Speakers</h1>"
  end

  test "show existing speaker", %{speaker: speaker} do
    conn = get conn, speaker_path(conn, :show, speaker.slug)

    assert html_response(conn, 200) =~ speaker.name
  end

  test "renders page not found when speaker is nonexistent" do
    assert_error_sent 404, fn ->
      get conn, speaker_path(conn, :show, "does-not-exist")
    end
  end
end
