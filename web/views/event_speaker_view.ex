defmodule ElixirLangMoscow.EventSpeakerView do
  use ElixirLangMoscow.Web, :view

  import ElixirLangMoscow.Speaker, only: [avatar_url: 1]
  alias ElixirLangMoscow.EventSpeaker

  def has_video?(%EventSpeaker{video_link: ""}) do
    false
  end
  def has_video?(%EventSpeaker{video_link: nil}) do
    false
  end
  def has_video?(%EventSpeaker{video_link: _}) do
    true
  end
end
