defmodule ElixirLangMoscow.SpeakerView do
  use ElixirLangMoscow.Web, :view

  import ElixirLangMoscow.Speaker, only: [avatar_url: 1]
  alias ElixirLangMoscow.Speaker

  def speaker_info(%Speaker{name: name}), do: "#{name}"
  def speaker_info(%Speaker{name: name, company: nil}), do: "#{name}"
  def speaker_info(%Speaker{name: name, company: company}) do
    "#{name} (#{company})"
  end
end
