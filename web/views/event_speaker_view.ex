defmodule ElixirLangMoscow.EventSpeakerView do
  use ElixirLangMoscow.Web, :view

  import ElixirLangMoscow.Speaker, only: [avatar_url: 1]
  import ElixirLangMoscow.Utils, only: [
    embed_youtube: 1,
    embed_speakerdeck: 1
  ]
  
  alias ElixirLangMoscow.EventSpeaker

  def has_video?(%EventSpeaker{video_link: ""}), do: false
  def has_video?(%EventSpeaker{video_link: nil}), do: false
  def has_video?(%EventSpeaker{video_link: _}), do: true

  def has_slides?(%EventSpeaker{speakerdeck_id: ""}), do: false
  def has_slides?(%EventSpeaker{speakerdeck_id: nil}), do: false
  def has_slides?(%EventSpeaker{speakerdeck_id: _}), do: true
end
