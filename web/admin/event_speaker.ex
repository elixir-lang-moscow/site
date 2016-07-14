defmodule ElixirLangMoscow.ExAdmin.EventSpeaker do
  use ExAdmin.Register

  register_resource ElixirLangMoscow.EventSpeaker do
    menu priority: 2

    scope :all, default: true

    query do
      %{all: [preload: [:event, :speaker]]}
    end

  end
end
