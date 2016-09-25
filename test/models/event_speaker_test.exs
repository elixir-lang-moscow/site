defmodule ElixirLangMoscow.EventSpeakerTest do
  use ElixirLangMoscow.ModelCase

  alias ElixirLangMoscow.EventSpeaker
  alias ElixirLangMoscow.BaseTest

  @invalid_attrs %{any_other: 0}

  setup do
    event = BaseTest.create_event()
    speaker = BaseTest.create_speaker()

    {:ok, %{speaker: speaker, event: event}}
  end

  test "changeset with valid attributes", context do
    changeset = EventSpeaker.changeset(%EventSpeaker{}, %{
      event_id: context.event.id,
      speaker_id: context.speaker.id,
      title: "some-title"
    })
    assert changeset.valid?
  end

  test "changeset with valid attributes and speakerdeck_id", context do
    changeset = EventSpeaker.changeset(%EventSpeaker{}, %{
      event_id: context.event.id,
      speaker_id: context.speaker.id,
      title: "some-title",
      speakerdeck_id: "some-id"
    })
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = EventSpeaker.changeset(%EventSpeaker{}, @invalid_attrs)
    refute changeset.valid?
  end
end
