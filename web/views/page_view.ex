defmodule ElixirLangMoscow.PageView do
  use ElixirLangMoscow.Web, :view

  def talk_speaker(talk) do
    case talk.speaker do
      nil -> gettext "Annonymous speaker"
      _ -> "#{talk.speaker.name} - #{talk.speaker.company}"
    end
  end
end
