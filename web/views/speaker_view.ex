defmodule ElixirLangMoscow.SpeakerView do
  use ElixirLangMoscow.Web, :view
  import ElixirLangMoscow.Speaker, only: [avatar_url: 1]

  def avatar(speaker) do
    avatar_url(speaker)
  end
end
