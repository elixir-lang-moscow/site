defmodule ElixirLangMoscow.EventSpeakerView do
  use ElixirLangMoscow.Web, :view

  import ElixirLangMoscow.Speaker, only: [avatar_url: 1]
  import ElixirLangMoscow.Utils, only: [embed_youtube: 1]
  alias ElixirLangMoscow.EventSpeaker

  def has_video?(%EventSpeaker{video_link: ""}), do: false
  def has_video?(%EventSpeaker{video_link: nil}), do: false
  def has_video?(%EventSpeaker{video_link: _}), do: true
end
