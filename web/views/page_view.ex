defmodule ElixirLangMoscow.PageView do
  use ElixirLangMoscow.Web, :view

  import ElixirLangMoscow.Utils, only: [link_youtube: 1]
  alias ElixirLangMoscow.Event

  def has_translation?(%Event{on_air: false}), do: false
  def has_translation?(%Event{translation_link: ""}), do: false
  def has_translation?(%Event{translation_link: nil}), do: false

  def has_translation?(%Event{translation_link: _, on_air: true}), do: true
end
